import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Card, CardContent, Button, Chip, Avatar, Grid, Divider } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import BarChartIcon from '@mui/icons-material/BarChart';

const sidebarWidth = 80;
const navItems = [
  { label: 'Items', icon: <FastfoodIcon /> },
  { label: 'Orders', icon: <ListAltIcon /> },
  { label: 'Runners', icon: <DirectionsRunIcon /> },
  { label: 'Statistics', icon: <BarChartIcon /> },
];

const orders = [
  {
    id: 1,
    name: 'Lela Bradley',
    avatar: '',
    message: 'Hello, add one more set of cutlery, please',
    items: [
      { name: 'Pizza MARGHERITA', desc: 'Hand milled Italian tomatoes.', price: 10, addons: ['Extra Cheese, Tomatoes'], addonPrice: 1.05 },
    ],
    total: 11.05,
  },
];

const inProgress = [
  { id: 2, name: 'Rena Parker', status: 'Ready for Pick-up', avatar: '', },
  { id: 3, name: 'Amy Curtis', status: 'Ready for Pick-up', avatar: '', },
  { id: 4, name: 'Vernon Alvarez', status: 'In Delivery', avatar: '', },
];

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #ff5f6d 0%, #ffc371 100%)' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarWidth,
            boxSizing: 'border-box',
            background: '#fff',
            borderTopRightRadius: 32,
            borderBottomRightRadius: 32,
            boxShadow: 3,
            pt: 4,
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.label} sx={{ mb: 2, justifyContent: 'center' }}>
              <ListItemIcon sx={{ minWidth: 0, color: '#ff5f6d', justifyContent: 'center' }}>{item.icon}</ListItemIcon>
              {/* Optionally show label */}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ flex: 1, p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Orders <span style={{ color: '#ff5f6d', fontWeight: 400 }}>Primavera Sound Festival 2019</span></Typography>
            {orders.map(order => (
              <Card key={order.id} sx={{ borderRadius: 4, mb: 3, boxShadow: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ bgcolor: '#ff5f6d', mr: 2 }}>{order.name[0]}</Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{order.name}</Typography>
                      <Typography variant="caption" color="text.secondary">Order #1234</Typography>
                    </Box>
                    <Box sx={{ flex: 1 }} />
                    <Button variant="outlined" color="error" sx={{ mr: 1, borderRadius: 3 }}>Decline</Button>
                    <Button variant="contained" sx={{ bgcolor: '#ff5f6d', color: '#fff', borderRadius: 3 }}>Accept Order</Button>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{order.message}</Typography>
                  <Divider sx={{ mb: 1 }} />
                  {order.items.map((item, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{item.desc}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Add-ons: {item.addons.join(', ')} (+${item.addonPrice.toFixed(2)})</Typography>
                      </Box>
                      <Typography sx={{ fontWeight: 600 }}>${order.total.toFixed(2)}</Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>In Progress</Typography>
            {inProgress.map(user => (
              <Card key={user.id} sx={{ borderRadius: 4, mb: 2, boxShadow: 2 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: '#ffc371', mr: 2 }}>{user.name[0]}</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 600 }}>{user.name}</Typography>
                    <Typography variant="caption" color="text.secondary">Order #1234</Typography>
                  </Box>
                  <Chip
                    label={user.status}
                    color={user.status === 'In Delivery' ? 'warning' : 'success'}
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  />
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
} 