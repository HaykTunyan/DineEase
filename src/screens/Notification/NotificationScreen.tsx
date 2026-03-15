import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Platform, StatusBar } from 'react-native';
import Header from '@components/common/Header';
import { Colors } from '@theme/colors';

const NotificationScreen: React.FC = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [phoneEnabled, setPhoneEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [infoEnabled, setInfoEnabled] = useState(true);

  const thumbColorFn = (isEnabled: boolean) => {
    if (Platform.OS === 'ios') return '#fff';
    return isEnabled ? Colors.primary : '#f4f3f4';
  };

  const trackColor = { false: Colors.border, true: Platform.OS === 'ios' ? Colors.primary : Colors.primary };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header title="Settings" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <View style={styles.headerArea}>
          <Text style={styles.pageTitle}>Notifications</Text>
          <Text style={styles.pageSubtitle}>
            Manage how DineEase keeps you updated about your reservations and special offers.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alert Preferences</Text>

          <View style={styles.settingRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.rowIcon}>✉️</Text>
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Email Notifications</Text>
              <Text style={styles.settingDesc}>Reservation confirmations and receipts.</Text>
            </View>
            <Switch
              trackColor={trackColor}
              thumbColor={thumbColorFn(emailEnabled)}
              ios_backgroundColor={Colors.surfaceLight}
              onValueChange={setEmailEnabled}
              value={emailEnabled}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.rowIcon}>📱</Text>
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Phone (SMS) Alerts</Text>
              <Text style={styles.settingDesc}>Last-minute mods and table ready updates.</Text>
            </View>
            <Switch
              trackColor={trackColor}
              thumbColor={thumbColorFn(phoneEnabled)}
              ios_backgroundColor={Colors.surfaceLight}
              onValueChange={setPhoneEnabled}
              value={phoneEnabled}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.rowIcon}>🔔</Text>
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingDesc}>Instant alerts on your device.</Text>
            </View>
            <Switch
              trackColor={trackColor}
              thumbColor={thumbColorFn(pushEnabled)}
              ios_backgroundColor={Colors.surfaceLight}
              onValueChange={setPushEnabled}
              value={pushEnabled}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Offers & News</Text>

          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={styles.iconContainer}>
              <Text style={styles.rowIcon}>🎁</Text>
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Promotions</Text>
              <Text style={styles.settingDesc}>Exclusive events and seasonal launches.</Text>
            </View>
            <Switch
              trackColor={trackColor}
              thumbColor={thumbColorFn(infoEnabled)}
              ios_backgroundColor={Colors.surfaceLight}
              onValueChange={setInfoEnabled}
              value={infoEnabled}
            />
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>Device Settings</Text>
          <Text style={styles.infoBoxText}>
            For immediate push notifications, ensure DineEase is allowed in your device's global settings.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  headerArea: {
    marginBottom: 30,
    marginTop: 10,
  },
  pageTitle: {
    color: Colors.primary,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pageSubtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  section: {
    marginBottom: 25,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rowIcon: {
    fontSize: 18,
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  settingTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDesc: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  infoBox: {
    backgroundColor: Colors.surfaceLight,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 10,
  },
  infoBoxTitle: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoBoxText: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  }
});

export default NotificationScreen;
