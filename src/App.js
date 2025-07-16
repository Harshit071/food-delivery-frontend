import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, TextField, Box, Alert, Card, CardContent, CardActions, Grid, List, ListItem, ListItemText, IconButton, ThemeProvider, createTheme, CssBaseline, CardMedia, BottomNavigation, BottomNavigationAction, Paper, Fab, Drawer } from '@mui/material';
import { AuthContext } from './AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';

const theme = createTheme({
  palette: {
    primary: { main: '#ff9800' },
    secondary: { main: '#ffcc80' },
    background: { default: '#fff8f1' },
  },
  shape: { borderRadius: 28 },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { borderRadius: 20, fontWeight: 600, fontSize: 18 },
  },
});

const restaurantImages = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1526178613658-3f1622045557?auto=format&fit=crop&w=400&q=80',
];
const foodImages = [
  'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
];

function Home() {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center', py: 5, px: 2 }}>
      <img src="https://img.freepik.com/free-vector/food-delivery-concept-illustration_114360-674.jpg?w=740" alt="Food Delivery" style={{ width: '90%', maxWidth: 340, borderRadius: 32, boxShadow: '0 8px 32px #ff980033', marginBottom: 32 }} />
      <Typography variant="h4" color="primary" gutterBottom sx={{ mt: 2, fontWeight: 800 }}>Food Point</Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 5, fontWeight: 400, fontSize: 18 }}>
        Order your favorite food from the best restaurants!
      </Typography>
      <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 8, px: 6, py: 2, fontWeight: 700, fontSize: 22, boxShadow: 2 }} onClick={() => navigate('/restaurants')}>Get Started</Button>
    </Box>
  );
}

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      login(data.access_token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#fff', borderRadius: 4, boxShadow: 3, mt: 8 }}>
      <Typography variant="h5" align="center" color="primary" sx={{ fontWeight: 700, mb: 2 }}>Login</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} required size="large" sx={{ mb: 2 }} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required size="large" sx={{ mb: 2 }} />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 8, fontSize: 18, py: 1.5, fontWeight: 700 }} onClick={handleSubmit}>Login</Button>
    </Box>
  );
}

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, address }),
      });
      if (!res.ok) {
        const data = await res.json();
        let errorMsg = 'Registration failed';
        if (Array.isArray(data.detail)) {
          errorMsg = data.detail.map(e => {
            const field = e.loc && e.loc.length > 1 ? e.loc[1] : '';
            return field ? `${field}: ${e.msg}` : e.msg;
          }).join(', ');
        } else if (typeof data.detail === 'object') {
          errorMsg = data.detail.msg || JSON.stringify(data.detail);
        } else if (typeof data.detail === 'string') {
          errorMsg = data.detail;
        }
        throw new Error(errorMsg);
      }
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#fff', borderRadius: 4, boxShadow: 3, mt: 8 }}>
      <Typography variant="h5" align="center" color="primary" sx={{ fontWeight: 700, mb: 2 }}>Register</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <TextField label="Name" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} required size="large" sx={{ mb: 2 }} />
      <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} required size="large" sx={{ mb: 2 }} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required size="large" sx={{ mb: 2 }} />
      <TextField label="Address" fullWidth margin="normal" value={address} onChange={e => setAddress(e.target.value)} required size="large" sx={{ mb: 2 }} />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 8, fontSize: 18, py: 1.5, fontWeight: 700 }} onClick={handleSubmit}>Register</Button>
    </Box>
  );
}

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/restaurants/`)
      .then(res => {
        if (!res.ok) throw new Error('Load failed');
        return res.json();
      })
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Load failed');
        setLoading(false);
      });
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ px: { xs: 1, md: 3 }, pt: 3 }}>
      <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 800, mb: 3, letterSpacing: 1 }}>Restaurants</Typography>
      <Grid container spacing={4}>
        {restaurants.map((r, idx) => (
          <Grid item xs={12} key={r.id}>
            <Card sx={{ borderRadius: 5, boxShadow: 4, display: 'flex', alignItems: 'center', p: 2, bgcolor: '#fff', minHeight: 120 }}>
              <CardMedia
                component="img"
                image={restaurantImages[idx % restaurantImages.length]}
                alt={r.name}
                sx={{ width: 100, height: 100, borderRadius: 4, objectFit: 'cover', mr: 3 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>{r.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{r.address}</Typography>
                <Button component={Link} to={`/restaurants/${r.id}`} variant="contained" color="primary" sx={{ borderRadius: 8, width: '100%', fontWeight: 700 }}>View Menu</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function RestaurantDetails({ addToCart }) {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/restaurants/`).then(res => res.json()),
      fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/food_items/`).then(res => res.json())
    ]).then(([restaurants, foodItems]) => {
      const rest = restaurants.find(r => r.id === parseInt(id));
      setRestaurant(rest);
      setFoodItems(foodItems.filter(f => f.restaurant_id === rest.id));
      setLoading(false);
    }).catch(err => {
      setError('Failed to load menu');
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!restaurant) return <Alert severity="error">Restaurant not found</Alert>;

  return (
    <Box sx={{ px: { xs: 1, md: 3 }, pt: 3 }}>
      <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 800, mb: 3, letterSpacing: 1 }}>{restaurant.name} Menu</Typography>
      <Grid container spacing={4}>
        {foodItems.map((f, idx) => (
          <Grid item xs={12} key={f.id}>
            <Card sx={{ borderRadius: 5, boxShadow: 4, display: 'flex', alignItems: 'center', p: 2, bgcolor: '#fff', minHeight: 120 }}>
              <CardMedia
                component="img"
                image={foodImages[idx % foodImages.length]}
                alt={f.name}
                sx={{ width: 100, height: 100, borderRadius: 4, objectFit: 'cover', mr: 3 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>{f.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>₹{f.price.toFixed(2)}</Typography>
                <Button onClick={() => addToCart(f)} variant="contained" color="primary" sx={{ borderRadius: 8, width: '100%', fontWeight: 700 }}>Add to Cart</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function Cart({ cart, removeFromCart, clearCart, placeOrder, orderStatus, orderLoading }) {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  if (!token) return <Alert severity="info">Please <Button onClick={() => navigate('/login')}>login</Button> to place an order.</Alert>;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ px: { xs: 1, md: 3 }, pt: 3 }}>
      <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 800, mb: 3, letterSpacing: 1 }}>Cart</Typography>
      {cart.length === 0 ? <Typography>Your cart is empty.</Typography> : (
        <List>
          {cart.map((item, idx) => (
            <ListItem key={idx} secondaryAction={
              <IconButton edge="end" onClick={() => removeFromCart(item.id)}><DeleteIcon /></IconButton>
            }>
              <ListItemText
                primary={<span style={{ fontWeight: 700 }}>{item.name} x{item.quantity}</span>}
                secondary={<span style={{ color: '#ff9800', fontWeight: 600 }}>₹{(item.price * item.quantity).toFixed(2)}</span>}
              />
            </ListItem>
          ))}
        </List>
      )}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }}>Total: <span style={{ color: '#ff9800' }}>₹{total.toFixed(2)}</span></Typography>
      <Fab variant="extended" color="primary" onClick={placeOrder} disabled={orderLoading || cart.length === 0} sx={{ mt: 4, borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18, py: 1.5 }}>
        <ShoppingCartIcon sx={{ mr: 1 }} />
        {orderLoading ? 'Placing Order...' : 'Place Order'}
      </Fab>
      <Button variant="outlined" color="secondary" onClick={clearCart} sx={{ mt: 2, borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 16, py: 1.2 }} disabled={cart.length === 0}>Clear Cart</Button>
      {orderStatus && <Alert severity={orderStatus.includes('success') ? 'success' : 'error'} sx={{ mt: 2 }}>{orderStatus}</Alert>}
    </Box>
  );
}

function Orders() {
  return <Typography variant="h5" color="primary" sx={{ px: { xs: 1, md: 3 }, pt: 3, fontWeight: 800, mb: 3, letterSpacing: 1 }}>Order History (to be implemented)</Typography>;
}
function Profile() {
  return <Typography variant="h5" color="primary" sx={{ px: { xs: 1, md: 3 }, pt: 3, fontWeight: 800, mb: 3, letterSpacing: 1 }}>Profile (to be implemented)</Typography>;
}

function App() {
  const { token, logout } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const addToCart = (food) => {
    setCart(prev => {
      const found = prev.find(item => item.id === food.id);
      if (found) {
        return prev.map(item => item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prev, { ...food, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const placeOrder = async () => {
    setOrderLoading(true);
    setOrderStatus(null);
    try {
      for (const item of cart) {
        const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/orders/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ food_item_id: item.id, quantity: item.quantity })
        });
        if (!res.ok) throw new Error('Order failed');
      }
      setOrderStatus('Order placed successfully!');
      clearCart();
    } catch (err) {
      setOrderStatus('Order failed.');
    } finally {
      setOrderLoading(false);
    }
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Restaurants', to: '/restaurants' },
    { label: 'Cart', to: '/cart' },
    { label: 'Profile', to: '/profile' },
    ...(!token ? [
      { label: 'Login', to: '/login' },
      { label: 'Register', to: '/register' },
    ] : [
      { label: 'Logout', action: logout },
    ])
  ];

  const drawer = (
    <Box sx={{ width: 220, p: 2 }} role="presentation" onClick={handleDrawerToggle}>
      {navLinks.map((link, idx) =>
        link.action ? (
          <Button key={idx} color="inherit" fullWidth sx={{ justifyContent: 'flex-start', mb: 1 }} onClick={link.action}>{link.label}</Button>
        ) : (
          <Button key={idx} color="inherit" fullWidth sx={{ justifyContent: 'flex-start', mb: 1 }} component={Link} to={link.to}>{link.label}</Button>
        )
      )}
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 1, sm: 2 } }}>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, fontSize: { xs: 20, sm: 24 } }}>Food Point</Typography>
          {isMobile ? (
            <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navLinks.map((link, idx) =>
                link.action ? (
                  <Button key={idx} color="inherit" onClick={link.action}>{link.label}</Button>
                ) : (
                  <Button key={idx} color="inherit" component={Link} to={link.to}>{link.label}</Button>
                )
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: 220 } }}
      >
        {drawer}
      </Drawer>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} placeOrder={placeOrder} orderStatus={orderStatus} orderLoading={orderLoading} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
