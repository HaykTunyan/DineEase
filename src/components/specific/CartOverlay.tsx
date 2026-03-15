import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Colors } from '@theme/colors';
import { useCart } from '@hooks/index';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CartOverlay = () => {
  const { cartItems, cartTotal, cartCount, updateQuantity, clearCart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (cartCount === 0 && !modalVisible) return null;

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setModalVisible(false);
      clearCart();
    }, 2000);
  };

  return (
    <>
      {/* Floating Bar */}
      <TouchableOpacity 
        style={styles.floatingBar} 
        activeOpacity={0.9}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.barLeft}>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{cartCount}</Text>
          </View>
          <Text style={styles.viewCartText}>View Cart</Text>
        </View>
        <Text style={styles.totalText}>${cartTotal.toFixed(2)}</Text>
      </TouchableOpacity>

      {/* Cart Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Your Order</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              {checkoutSuccess ? (
                <View style={styles.successContainer}>
                  <Text style={styles.successIcon}>🎉</Text>
                  <Text style={styles.successTitle}>Order Placed!</Text>
                  <Text style={styles.successSubtitle}>Your delicious meal is on its way.</Text>
                </View>
              ) : (
                <>
                  <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View style={styles.cartItem}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemInfo}>
                          <Text style={styles.itemName}>{item.name}</Text>
                          <Text style={styles.itemPrice}>{item.price}</Text>
                        </View>
                        <View style={styles.quantityControls}>
                          <TouchableOpacity 
                            style={styles.qtyBtn}
                            onPress={() => updateQuantity(item.id, -1)}
                          >
                            <Text style={styles.qtyBtnText}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.qtyText}>{item.quantity}</Text>
                          <TouchableOpacity 
                            style={styles.qtyBtn}
                            onPress={() => updateQuantity(item.id, 1)}
                          >
                            <Text style={styles.qtyBtnText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    contentContainerStyle={styles.listContent}
                  />

                  <View style={styles.footer}>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Subtotal</Text>
                      <Text style={styles.summaryValue}>${cartTotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Delivery Fee</Text>
                      <Text style={styles.summaryValue}>$2.00</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                      <Text style={styles.totalLabel}>Total</Text>
                      <Text style={styles.totalPrice}>${(cartTotal + 2).toFixed(2)}</Text>
                    </View>

                    <TouchableOpacity 
                      style={styles.checkoutBtn}
                      onPress={handleCheckout}
                    >
                      <Text style={styles.checkoutBtnText}>Confirm Order</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingBar: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    zIndex: 1000,
  },
  barLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countBadge: {
    backgroundColor: '#000',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  countText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  viewCartText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    height: SCREEN_HEIGHT * 0.85,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  safeArea: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeIcon: {
    color: Colors.textSecondary,
    fontSize: 24,
  },
  listContent: {
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: Colors.surfaceLight,
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: Colors.primary,
    fontSize: 14,
    marginTop: 2,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  qtyBtn: {
    padding: 10,
  },
  qtyBtnText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtyText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  footer: {
    padding: 20,
    backgroundColor: Colors.surfaceLight,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  summaryValue: {
    color: Colors.text,
    fontSize: 14,
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalLabel: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutBtnText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  successIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  successTitle: {
    color: Colors.primary,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successSubtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CartOverlay;
