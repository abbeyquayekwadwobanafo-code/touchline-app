import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { supabase } from '../../lib/supabase';

type Match = {
  id: string;
  league: string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  status: string;
  minute: string;
};

const FALLBACK_MATCHES: Match[] = [
  {
    id: '1',
    league: 'PREMIER LEAGUE',
    home_team: 'Arsenal',
    away_team: 'Chelsea',
    home_score: 2,
    away_score: 1,
    status: 'LIVE',
    minute: "78'",
  },
  {
    id: '2',
    league: 'UEFA CHAMPIONS LEAGUE',
    home_team: 'Real Madrid',
    away_team: 'Bayern Munich',
    home_score: 1,
    away_score: 1,
    status: 'LIVE',
    minute: "62'",
  },
  {
    id: '3',
    league: 'PREMIER LEAGUE',
    home_team: 'Liverpool',
    away_team: 'Manchester City',
    home_score: 0,
    away_score: 0,
    status: 'UPCOMING',
    minute: '18:30',
  },
];

export default function MatchdayScreen() {
  const [matches, setMatches] = useState<Match[]>(FALLBACK_MATCHES);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('matches').select('*');
      if (error || !data || data.length === 0) {
        setMatches(FALLBACK_MATCHES);
      } else {
        setMatches(data);
      }
    } catch (err) {
      setMatches(FALLBACK_MATCHES);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMatches();
  };

  const renderMatchCard = ({ item }: { item: Match }) => {
    const isLive = item.status === 'LIVE';

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.leagueText}>{item.league}</Text>
          <View style={[styles.badge, isLive ? styles.liveBadge : styles.upcomingBadge]}>
            <View style={[styles.dot, isLive ? styles.liveDot : styles.upcomingDot]} />
            <Text style={[styles.badgeText, isLive ? styles.liveBadgeText : styles.upcomingBadgeText]}>
              {isLive ? item.minute : item.status}
            </Text>
          </View>
        </View>

        <View style={styles.teamsContainer}>
          <View style={styles.teamRow}>
            <Text style={styles.teamName}>{item.home_team}</Text>
            <Text style={styles.scoreText}>{item.home_score}</Text>
          </View>
          <View style={styles.teamRow}>
            <Text style={styles.teamName}>{item.away_team}</Text>
            <Text style={styles.scoreText}>{item.away_score}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.blitzButton}
          activeOpacity={0.8}
          onPress={() => alert(`Starting 60s Matchday Blitz for ${item.home_team} vs ${item.away_team}!`)}
        >
          <Ionicons name="flash" size={16} color={COLORS.background} style={{ marginRight: 6 }} />
          <Text style={styles.blitzButtonText}>PLAY MATCHDAY BLITZ</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>TODAY'S FIXTURES</Text>
        <Text style={styles.headerSubtitle}>Tap any match to play a 60-sec rivalry trivia blitz</Text>
      </View>

      <FlatList
        data={matches}
        renderItem={renderMatchCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No fixtures available right now.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  headerSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  listContainer: {
    padding: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  leagueText: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  liveBadge: {
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
  },
  upcomingBadge: {
    backgroundColor: 'rgba(255, 179, 0, 0.15)',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  liveDot: {
    backgroundColor: COLORS.primary,
  },
  upcomingDot: {
    backgroundColor: COLORS.accent,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  liveBadgeText: {
    color: COLORS.primary,
  },
  upcomingBadgeText: {
    color: COLORS.accent,
  },
  teamsContainer: {
    marginBottom: SPACING.md,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  teamName: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  scoreText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '900',
  },
  blitzButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  blitzButtonText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
});
