import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Alert } from 'react-native';


const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'Fjallraven Backpack',
    price: 109.95,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    description: 'Your perfect pack for everyday use and walks in the forest.',
    category: "men's clothing",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: 'Mens Casual T-Shirt',
    price: 22.3,
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    description: 'Slim-fitting style, contrast raglan long sleeve.',
    category: "men's clothing",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    description: 'Great outerwear jackets for Spring/Autumn/Winter.',
    category: "men's clothing",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: 'Womens Jewelry',
    price: 695,
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    description: 'From our Legends Collection, the Naga was inspired by the mythical water dragon.',
    category: "jewelery",
    rating: { rate: 4.6, count: 400 }
  },
  {
    id: 5,
    title: 'Solid Gold Petite Micropave',
    price: 168,
    image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
    description: 'Satisfaction Guaranteed. Return or exchange any order within 30 days.',
    category: "jewelery",
    rating: { rate: 3.9, count: 70 }
  },
  {
    id: 6,
    title: 'White Gold Plated Princess',
    price: 9.99,
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    description: 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring.',
    category: "jewelery",
    rating: { rate: 3.0, count: 400 }
  }
];

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  
  const categories = ['all', ...new Set(MOCK_PRODUCTS.map(product => product.category))];

  const handleLogin = () => {
    if (loginEmail && loginPassword) {
      setUser({ email: loginEmail, name: 'Test User' });
      setScreen('products');
      Alert.alert('Success', 'Welcome to ShopEZ!');
    } else {
      Alert.alert('Error', 'Please enter email and password');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setScreen('welcome');
    Alert.alert('Success', 'Logged out successfully!');
  };

  // Add to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    Alert.alert('Success', 'Added to cart!');
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Calculate totals
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Filter products
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Welcome Screen
  if (screen === 'welcome') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🛍️ ShopEZ</Text>
        <Text style={styles.subtitle}>Your Mobile Shopping Destination</Text>
        
        <View style={styles.featureList}>
          <Text style={styles.feature}>✅ Browse Products</Text>
          <Text style={styles.feature}>✅ Secure Shopping Cart</Text>
          <Text style={styles.feature}>✅ Easy Checkout</Text>
          <Text style={styles.feature}>✅ User Authentication</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => setScreen('login')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        <Text style={styles.demoText}>
          Demo: Use any email/password to login
        </Text>
      </View>
    );
  }

  // Login Screen
  if (screen === 'login') {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
        
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={loginEmail}
            onChangeText={setLoginEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={loginPassword}
            onChangeText={setLoginPassword}
            secureTextEntry
          />
          
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => {
              setLoginEmail('test@shopez.com');
              setLoginPassword('password123');
              Alert.alert('Demo', 'Demo credentials filled! Click Sign In.');
            }}
          >
            <Text style={styles.secondaryButtonText}>Use Demo Credentials</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => setScreen('welcome')}
          >
            <Text style={styles.linkText}>← Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Products Screen
  if (screen === 'products') {
    return (
      <View style={styles.screenContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Products</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => setScreen('cart')}>
              <View style={styles.cartBadge}>
                <Text style={styles.cartButton}>Cart ({getCartItemCount()})</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logoutButton}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Welcome Message */}
        <Text style={styles.welcomeMessage}>Hello, {user?.name || 'User'}! 👋</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍 Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal style={styles.categoriesContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category === 'all' ? 'All' : category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products List */}
        <ScrollView style={styles.productList}>
          {filteredProducts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No products found</Text>
              <Text style={styles.emptyStateSubtext}>Try a different search or category</Text>
            </View>
          ) : (
            filteredProducts.map(product => (
              <View key={product.id} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle} numberOfLines={2}>{product.title}</Text>
                  <Text style={styles.productCategory}>{product.category}</Text>
                  <Text style={styles.productDescription} numberOfLines={2}>
                    {product.description}
                  </Text>
                  
                  <View style={styles.productFooter}>
                    <Text style={styles.productPrice}>${product.price}</Text>
                    <Text style={styles.productRating}>
                      ⭐ {product.rating.rate} ({product.rating.count})
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => addToCart(product)}
                >
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    );
  }

  // Cart Screen
  return (
    <View style={styles.screenContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('products')}>
          <Text style={styles.backButton}>← Products</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutButton}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <ScrollView style={styles.cartList}>
        {cart.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Your cart is empty</Text>
            <Text style={styles.emptyStateSubtext}>Add some products to get started!</Text>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => setScreen('products')}
            >
              <Text style={styles.primaryButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          cart.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.cartImage} />
              
              <View style={styles.cartDetails}>
                <Text style={styles.cartTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.cartPrice}>${item.price}</Text>
                
                <View style={styles.quantityContainer}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.cartActions}>
                <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Footer with Total and Checkout */}
      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>${getCartTotal()}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={() => Alert.alert('Checkout', 'Thank you for your order!')}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },

  // Typography
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#007bff'
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666'
  },

  // Welcome screen
  featureList: {
    marginBottom: 40,
    alignItems: 'center'
  },
  feature: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333'
  },
  demoText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#999',
    marginTop: 20
  },

  // Forms
  form: {
    width: '100%'
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16
  },

  // Buttons
  primaryButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  linkButton: {
    padding: 10,
    alignItems: 'center'
  },
  linkText: {
    color: '#007bff',
    fontSize: 16
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },
  backButton: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16
  },
  cartBadge: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#007bff'
  },
  cartButton: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 14
  },
  logoutButton: {
    color: '#dc3545',
    fontWeight: 'bold'
  },

  // Products screen
  welcomeMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
    fontWeight: '500'
  },
  searchContainer: {
    padding: 10,
    backgroundColor: 'white'
  },
  searchInput: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16
  },
  categoriesContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#dee2e6'
  },
  categoryButtonActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff'
  },
  categoryText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500'
  },
  categoryTextActive: {
    color: 'white'
  },

  // Product cards
  productList: {
    flex: 1,
    padding: 10
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10
  },
  productInfo: {
    marginBottom: 10
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333'
  },
  productCategory: {
    fontSize: 12,
    color: '#6c757d',
    textTransform: 'capitalize',
    marginBottom: 5
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 16
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff'
  },
  productRating: {
    fontSize: 12,
    color: '#6c757d'
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  // Cart
  cartList: {
    flex: 1,
    padding: 10
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  cartImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  cartDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  cartTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5
  },
  cartPrice: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
    marginBottom: 8
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  quantity: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold'
  },
  cartActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  removeButton: {
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  removeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },

  // Empty states
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
    textAlign: 'center'
  },

  // Footer
  footer: {
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff'
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});