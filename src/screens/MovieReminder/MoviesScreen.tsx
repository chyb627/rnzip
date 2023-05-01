import React from 'react';
import Colors from 'open-color';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import useMovies from '../../hooks/MovieReminder/useMovies';
import MovieInfoCard from '../../components/MovieReminder/MovieInfoCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  movieList: {
    padding: 20,
  },
  separator: {
    height: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MoviesScreen = () => {
  const { movies, isLoading, loadMore, refresh } = useMovies();
  console.log('@!$!@%$!@%!@%', movies.length);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {Platform.OS === 'ios' ? (
        <StatusBar barStyle="light-content" />
      ) : (
        <StatusBar barStyle="dark-content" />
      )}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          keyExtractor={(_, index) => `movie-info-${index}`}
          contentContainerStyle={styles.movieList}
          data={movies}
          renderItem={({ item: movie }) => (
            <MovieInfoCard
              title={movie.title}
              originalTitle={movie.originalTitle}
              releaseDate={movie.releaseData}
              overview={movie.overview}
              posterUrl={movie.posterUrl ?? undefined}
            />
          )}
          // eslint-disable-next-line react/no-unstable-nested-components
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl tintColor={Colors.white} refreshing={isLoading} onRefresh={refresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default MoviesScreen;
