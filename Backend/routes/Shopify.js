const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/orders', async (req, res) => {
  console.log("reached here");
  try {
    const response = await axios.get(`${process.env.SHOPIFY_STORE_URL}`, {
      headers: { 'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN },
    });
    const orders = response.data.orders;
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Shopify orders' });
  }
});

module.exports = router;
