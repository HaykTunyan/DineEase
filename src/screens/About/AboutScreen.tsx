import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import Header from '../../components/common/Header';

const { width } = Dimensions.get('window');

const AboutScreen: React.FC = () => {

  /**
   * 
   * 
   * About Screen Component.
   */


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header title="About Us" />

      <View style={styles.heroSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=1000' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>DineEase</Text>
          <Text style={styles.heroSubtitle}>Elevating Your Dining Experience</Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Who We Are</Text>
        <Text style={styles.paragraph}>
          DineEase is your premier destination for discovering, exploring, and reserving the finest culinary experiences your city has to offer. We believe that dining out is more than just a meal—it's an experience, a memory in the making, and a celebration of flavors.
        </Text>

        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.paragraph}>
          Our mission is to seamlessly connect passionate food lovers with exceptional restaurants. Through DineEase, we aim to eliminate the friction from dining by providing real-time availability, curated menus, and instant reservations, all from the palm of your hand.
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>10k+</Text>
            <Text style={styles.statLabel}>Happy Diners</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Restaurants</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>4.9/5</Text>
            <Text style={styles.statLabel}>App Rating</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Get In Touch</Text>
        <Text style={styles.paragraph}>
          We'd love to hear from you! Whether you have feedback, questions, or just want to say hello, our support team is available 24/7.
        </Text>
        <Text style={styles.contactInfo}>Email: support@dineease.com</Text>
        <Text style={styles.contactInfo}>Phone: +1 (800) 123-4567</Text>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  heroSection: {
    height: width * 0.6,
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    color: '#C9A07D',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'serif',
    letterSpacing: 2,
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 1,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  contentSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#C9A07D',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  paragraph: {
    color: '#ccc',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#C9A07D',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
    textTransform: 'uppercase',
  },
  contactInfo: {
    color: '#fff',
    fontSize: 15,
    marginTop: 5,
    fontWeight: '500',
  }
});

export default AboutScreen;
