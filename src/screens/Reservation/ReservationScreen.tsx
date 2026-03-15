import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import Header from '../../components/common/Header';
import TABLES from '../../json/tableItems.json';
import ReservationHistory from './ReservationHistory';

const { width } = Dimensions.get('window');
const TIME_SLOTS = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

interface Props {
  setActiveTab: (tab: string) => void;
}

const ReservationScreen: React.FC<Props> = ({ setActiveTab }) => {


  /**
   * 
   * 
   * Reservation Screen Component
   * 
   */


  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reservationVisible, setReservationVisible] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('New');

  const renderNewBooking = () => (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.reservSection}>
        <Text style={styles.reservLabel}>Select Time Slot</Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map(slot => (
            <TouchableOpacity
              key={slot}
              style={[styles.timeSlot, selectedTime === slot && styles.timeSlotActive]}
              onPress={() => setSelectedTime(slot)}
            >
              <Text style={[styles.timeSlotText, selectedTime === slot && styles.timeSlotTextActive]}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.reservSection}>
        <Text style={styles.reservLabel}>Choose Your Table</Text>
        <Text style={styles.reservSubtext}>Select an available table for your party</Text>

        <View style={styles.tableGrid}>
          {TABLES.map(table => (
            <TouchableOpacity
              key={table.id}
              disabled={table.status === 'reserved'}
              style={[
                styles.tableCircle,
                table.status === 'reserved' && styles.tableReserved,
                selectedTable === table.id && styles.tableSelected,
                { width: 60 + table.capacity * 2, height: 60 + table.capacity * 2 }
              ]}
              onPress={() => setSelectedTable(table.id)}
            >
              <Text style={styles.tableId}>{table.id}</Text>
              <Text style={styles.tableCap}>{table.capacity} seats</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#fff' }]} /><Text style={styles.legendText}>Available</Text></View>
          <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#333' }]} /><Text style={styles.legendText}>Reserved</Text></View>
          <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#C9A07D' }]} /><Text style={styles.legendText}>Selected</Text></View>
        </View>
      </View>

      {selectedTable && selectedTime && (
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => setReservationVisible(true)}
        >
          <Text style={styles.confirmBtnText}>Confirm Selection</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={reservationVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Complete Reservation</Text>
            <View style={styles.modalInfoRow}>
              <Text style={styles.modalInfoLabel}>Table:</Text>
              <Text style={styles.modalInfoValue}>{selectedTable}</Text>
            </View>
            <View style={styles.modalInfoRow}>
              <Text style={styles.modalInfoLabel}>Time:</Text>
              <Text style={styles.modalInfoValue}>{selectedTime}</Text>
            </View>

            <TextInput placeholder="Your Name" style={styles.input} placeholderTextColor="#999" />
            <TextInput placeholder="Phone Number" style={styles.input} keyboardType="phone-pad" placeholderTextColor="#999" />
            <TextInput placeholder="Special Requests" style={[styles.input, { height: 80 }]} multiline placeholderTextColor="#999" />

            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setReservationVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirm}
                onPress={() => {
                  setReservationVisible(false);
                  setActiveTab('Home');
                }}
              >
                <Text style={styles.modalConfirmText}>Reserve Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Header title="Reservations" />
      
      <View style={styles.subTabContainer}>
        <TouchableOpacity 
          style={[styles.subTab, activeSubTab === 'New' && styles.subTabActive]}
          onPress={() => setActiveSubTab('New')}
        >
          <Text style={[styles.subTabText, activeSubTab === 'New' && styles.subTabTextActive]}>Book a Table</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.subTab, activeSubTab === 'History' && styles.subTabActive]}
          onPress={() => setActiveSubTab('History')}
        >
          <Text style={[styles.subTabText, activeSubTab === 'History' && styles.subTabTextActive]}>My History</Text>
        </TouchableOpacity>
      </View>

      {activeSubTab === 'New' ? renderNewBooking() : <ReservationHistory />}
    </View>
  );
};

const styles = StyleSheet.create({
  subTabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 5,
  },
  subTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  subTabActive: {
    backgroundColor: '#C9A07D',
  },
  subTabText: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
  },
  subTabTextActive: {
    color: '#000',
  },
  reservSection: {
    padding: 20,
  },
  reservLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  reservSubtext: {
    color: '#999',
    fontSize: 14,
    marginBottom: 20,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeSlot: {
    width: (width - 70) / 4,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeSlotActive: {
    backgroundColor: '#C9A07D',
    borderColor: '#C9A07D',
  },
  timeSlotText: {
    color: '#ccc',
    fontSize: 14,
  },
  timeSlotTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  tableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 20,
    paddingTop: 10,
  },
  tableCircle: {
    borderRadius: 100,
    backgroundColor: '#111',
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#C9A07D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tableReserved: {
    backgroundColor: '#222',
    borderColor: '#111',
    opacity: 0.4,
  },
  tableSelected: {
    borderColor: '#C9A07D',
    backgroundColor: '#1A1A1A',
  },
  tableId: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableCap: {
    color: '#999',
    fontSize: 10,
    marginTop: 2,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: '#999',
    fontSize: 12,
  },
  confirmBtn: {
    backgroundColor: '#C9A07D',
    margin: 20,
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#111',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    minHeight: 500,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInfoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  modalInfoLabel: {
    color: '#999',
    fontSize: 16,
    width: 80,
  },
  modalInfoValue: {
    color: '#C9A07D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 15,
    color: '#fff',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  modalBtns: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 15,
  },
  modalCancel: {
    flex: 1,
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#fff',
    fontSize: 16,
  },
  modalConfirm: {
    flex: 2,
    backgroundColor: '#C9A07D',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalConfirmText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReservationScreen;
