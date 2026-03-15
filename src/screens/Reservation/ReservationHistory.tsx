import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Switch, Platform, ScrollView, StatusBar } from 'react-native';
import { RESERVATION_HISTORY } from '../../utils/mockData';
import { Colors } from '@theme/colors';
import Header from '@components/common/Header';

const ReservationHistory = () => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return Colors.statusCompleted;
      case 'Cancelled': return Colors.statusCancelled;
      case 'Upcoming': return Colors.statusUpcoming;
      default: return Colors.textMuted;
    }
  };

  const [selectedRes, setSelectedRes] = useState<any>(null);
  const [emailAlert, setEmailAlert] = useState(true);
  const [phoneAlert, setPhoneAlert] = useState(false);
  const [pushAlert, setPushAlert] = useState(true);

  const thumbColorFn = (isEnabled: boolean) => {
    if (Platform.OS === 'ios') return '#fff';
    return isEnabled ? Colors.primary : '#f4f3f4';
  };
  const trackColor = { false: Colors.border, true: Platform.OS === 'ios' ? Colors.primary : '#8c6a46' };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header title="My Reservations" />
      <FlatList
        data={RESERVATION_HISTORY}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => setSelectedRes(item)}
          >
            <Image source={{ uri: item.restaurantImage }} style={styles.image} />
            <View style={styles.details}>
              <View style={styles.headerRow}>
                 <Text style={styles.name}>{item.restaurantName}</Text>
                 <Text style={[styles.status, { color: getStatusColor(item.status) }]}>{item.status}</Text>
              </View>
              <Text style={styles.location}>{item.location}</Text>
              
              <View style={styles.metaRow}>
                <View style={styles.metaBox}>
                  <Text style={styles.metaLabel}>Date</Text>
                  <Text style={styles.metaValue}>{item.date}</Text>
                </View>
                <View style={styles.metaBox}>
                  <Text style={styles.metaLabel}>Time</Text>
                  <Text style={styles.metaValue}>{item.time}</Text>
                </View>
                <View style={styles.metaBox}>
                  <Text style={styles.metaLabel}>Party</Text>
                  <Text style={styles.metaValue}>{item.guests} Guests</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={!!selectedRes}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedRes && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Reservation Details</Text>
                  <TouchableOpacity onPress={() => setSelectedRes(null)}>
                    <Text style={styles.closeText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <Image source={{ uri: selectedRes.restaurantImage }} style={styles.modalImage} />
                
                <Text style={styles.modalResName}>{selectedRes.restaurantName}</Text>
                <Text style={styles.modalResLocation}>{selectedRes.location}</Text>
                
                <View style={styles.modalInfoGrid}>
                   <View style={styles.modalInfoBox}>
                     <Text style={styles.modalInfoLabel}>Date</Text>
                     <Text style={styles.modalInfoValue}>{selectedRes.date}</Text>
                   </View>
                   <View style={styles.modalInfoBox}>
                     <Text style={styles.modalInfoLabel}>Time</Text>
                     <Text style={styles.modalInfoValue}>{selectedRes.time}</Text>
                   </View>
                   <View style={styles.modalInfoBox}>
                     <Text style={styles.modalInfoLabel}>Guests</Text>
                     <Text style={styles.modalInfoValue}>{selectedRes.guests}</Text>
                   </View>
                   <View style={styles.modalInfoBox}>
                     <Text style={styles.modalInfoLabel}>Status</Text>
                     <Text style={[styles.modalInfoValue, { color: getStatusColor(selectedRes.status) }]}>{selectedRes.status}</Text>
                   </View>
                </View>

                {selectedRes.status === 'Upcoming' && (
                  <View style={styles.remindersSection}>
                    <Text style={styles.remindersTitle}>Manage Reminders</Text>
                    
                    <View style={styles.reminderRow}>
                      <View>
                        <Text style={styles.reminderLabel}>Email Reminder</Text>
                        <Text style={styles.reminderSub}>Get an email 2 hours before</Text>
                      </View>
                      <Switch trackColor={trackColor} thumbColor={thumbColorFn(emailAlert)} onValueChange={setEmailAlert} value={emailAlert} />
                    </View>

                    <View style={styles.reminderRow}>
                      <View>
                        <Text style={styles.reminderLabel}>SMS (Text) Reminder</Text>
                        <Text style={styles.reminderSub}>Get a text 30 mins before</Text>
                      </View>
                      <Switch trackColor={trackColor} thumbColor={thumbColorFn(phoneAlert)} onValueChange={setPhoneAlert} value={phoneAlert} />
                    </View>

                    <View style={styles.reminderRow}>
                      <View>
                        <Text style={styles.reminderLabel}>App Push Notification</Text>
                        <Text style={styles.reminderSub}>Get notified when table is ready</Text>
                      </View>
                      <Switch trackColor={trackColor} thumbColor={thumbColorFn(pushAlert)} onValueChange={setPushAlert} value={pushAlert} />
                    </View>
                  </View>
                )}

                <TouchableOpacity 
                   style={styles.saveBtn}
                   onPress={() => setSelectedRes(null)}
                >
                  <Text style={styles.saveBtnText}>{selectedRes.status === 'Upcoming' ? 'Save Preferences' : 'Close'}</Text>
                </TouchableOpacity>

              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    padding: 15,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: '100%',
    height: 160,
  },
  details: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  location: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceLight,
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  metaBox: {
    alignItems: 'center',
  },
  metaLabel: {
    color: Colors.textMuted,
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  metaValue: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.modalOverlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 25,
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeText: {
    color: Colors.textSecondary,
    fontSize: 24,
    padding: 5,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  modalResName: {
    color: Colors.primary,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalResLocation: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 25,
  },
  modalInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 30,
  },
  modalInfoBox: {
    width: '47%',
    backgroundColor: Colors.surfaceLight,
    padding: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalInfoLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  modalInfoValue: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  remindersSection: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 30,
  },
  remindersTitle: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  reminderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  reminderLabel: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  reminderSub: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  saveBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default ReservationHistory;
