import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = '@dineease_user_settings';

export interface UserSettings {
  emailAlerts: boolean;
  phoneAlerts: boolean;
  pushAlerts: boolean;
  infoAlerts: boolean;
  theme: 'light' | 'dark' | 'system';
}

const defaultSettings: UserSettings = {
  emailAlerts: true,
  phoneAlerts: false,
  pushAlerts: true,
  infoAlerts: true,
  theme: 'dark'
};

export class StorageService {
  /**
   * Save user settings to local storage
   */
  static async saveSettings(settings: Partial<UserSettings>): Promise<void> {
    try {
      const current = await this.getSettings();
      const updated = { ...current, ...settings };
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  /**
   * Retrieve user settings from local storage
   */
  static async getSettings(): Promise<UserSettings> {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored !== null) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to retrieve settings:', error);
    }
    return defaultSettings;
  }

  /**
   * Clear all user data (mock logout)
   */
  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  }
}
