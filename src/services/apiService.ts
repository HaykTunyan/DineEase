import { MENU_ITEMS, RESTAURANTS, TABLES, RESERVATION_HISTORY } from '../utils/mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ApiService {
  /**
   * Fetch all available restaurants
   */
  static async getRestaurants() {
    await delay(800);
    return RESTAURANTS;
  }

  /**
   * Fetch menu items, optionally filtered by category
   */
  static async getMenuItems(category: string = 'All') {
    await delay(500);
    if (category === 'All') return MENU_ITEMS;
    return MENU_ITEMS.filter(item => item.category === category);
  }

  /**
   * Fetch table availability
   */
  static async getTables() {
    await delay(600);
    return TABLES;
  }

  /**
   * Fetch a user's reservation history
   */
  static async getReservationHistory() {
    await delay(700);
    return RESERVATION_HISTORY;
  }

  /**
   * Submit a new reservation
   */
  static async createReservation(data: { tableId: string, time: string, name: string, phone: string, notes: string }) {
    await delay(1000);
    // Simulate successful booking
    return {
      success: true,
      reservationId: `RES-${Math.floor(Math.random() * 10000)}`,
      message: 'Reservation confirmed successfully!'
    };
  }
}
