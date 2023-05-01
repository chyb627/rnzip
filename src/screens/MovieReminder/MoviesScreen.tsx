import React from 'react';
import Colors from 'open-color';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import useMovies from '../../hooks/MovieReminder/useMovies';
import MovieInfoCard from '../../components/MovieReminder/MovieInfoCard';
import Screen from '../../components/MovieReminder/Screen';

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

  return (
    <Screen headerVisible={false}>
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
              id={movie.id}
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
    </Screen>
  );
};

export default MoviesScreen;
