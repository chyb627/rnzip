import React from 'react';
import { FlatList, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/store';

import Kakaotalk from './src/screens/Kakaotalk';
import Calculator from './src/screens/Calculator';
import TodoApp from './src/screens/TodoApp';
import Kakaobus from './src/screens/Kakaobus';
import Translation from './src/screens/Translation';
import ScrapWeb from './src/screens/ScrapWeb';
import SnowBackground from './src/screens/SnowBackground';
import PageHeader from './src/screens/PageHeader';
import Rocket from './src/screens/Rocket';
import SkeletonUi from './src/screens/SkeletonUi';
import Lottie from './src/screens/Lottie';
import Collapse from './src/screens/Collapse';
import CardWallet from './src/screens/CardWallet';
import ModalScreen from './src/screens/ModalScreen';
import InfinityScroll from './src/screens/InfinityScroll';
import AnimationScreen from './src/screens/AnimationScreen';
import ReanimatedScreen from './src/screens/ReanimatedScreen';
import Graffiti from './src/screens/Graffiti';
import PanResponderInfo from './src/screens/PanResponderInfo';
import PanResponderBall from './src/screens/PanResponderBall';
import PanResponderBannerSlider from './src/screens/PanResponderBannerSlider';
import PanResponderFontSlider from './src/screens/PanResponderFontSlider';
import LoveDog from './src/screens/LoveDog';
import MovieReminder from './src/screens/MovieReminder';

type Screens = Record<string, { screen: React.ComponentType; title?: string }>;

const SCREENS: Screens = {
  MovieReminder: {
    screen: MovieReminder,
    title: 'MovieReminder',
  },
  LoveDog: {
    screen: LoveDog,
    title: 'LoveDog',
  },
  Graffiti: {
    screen: Graffiti,
    title: 'Graffiti',
  },
  PanResponderInfo: {
    screen: PanResponderInfo,
    title: 'PanResponderInfo',
  },
  PanResponderBall: {
    screen: PanResponderBall,
    title: 'PanResponderBall',
  },
  PanResponderBannerSlider: {
    screen: PanResponderBannerSlider,
    title: 'PanResponderBannerSlider',
  },
  PanResponderFontSlider: {
    screen: PanResponderFontSlider,
    title: 'PanResponderFontSlider',
  },
  Kakaotalk: {
    screen: Kakaotalk,
    title: 'Kakaotalk',
  },
  Calculator: {
    screen: Calculator,
    title: 'Calculator',
  },
  TodoApp: {
    screen: TodoApp,
    title: 'TodoApp',
  },
  Kakaobus: {
    screen: Kakaobus,
    title: 'Kakaobus',
  },
  Translation: {
    screen: Translation,
    title: 'Translation',
  },
  ScrapWeb: {
    screen: ScrapWeb,
    title: 'ScrapWeb',
  },
  SnowBackground: {
    screen: SnowBackground,
    title: 'SnowBackground',
  },
  PageHeader: {
    screen: PageHeader,
    title: 'PageHeader',
  },
  Rocket: {
    screen: Rocket,
    title: 'Rocket',
  },
  SkeletonUi: {
    screen: SkeletonUi,
    title: 'SkeletonUi',
  },
  Lottie: {
    screen: Lottie,
    title: 'Lottie',
  },
  Collapse: {
    screen: Collapse,
    title: 'Collapse',
  },
  CardWallet: {
    screen: CardWallet,
    title: 'CardWallet',
  },
  ModalScreen: {
    screen: ModalScreen,
    title: 'ModalScreen',
  },
  InfinityScroll: {
    screen: InfinityScroll,
    title: 'InfinityScroll',
  },
  AnimationScreen: {
    screen: AnimationScreen,
    title: 'Animation',
  },
  ReanimatedScreen: {
    screen: ReanimatedScreen,
    title: 'Reanimated Screen',
  },
};

type RootStackParams = { Home: undefined } & { [key: string]: undefined };
type MainScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParams, 'Home'>;
};

function MainScreen({ navigation }: MainScreenProps) {
  const data = Object.keys(SCREENS).map((key) => ({ key }));
  return (
    <FlatList
      style={styles.list}
      data={data}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(props) => (
        <MainScreenItem
          {...props}
          screens={SCREENS}
          onPressItem={({ key }) => navigation.navigate(key)}
        />
      )}
      renderScrollComponent={(props) => <ScrollView {...props} />}
    />
  );
}

export function ItemSeparator(): React.ReactElement {
  return <View style={styles.separator} />;
}

type Item = { key: string };
type MainScreenItemProps = {
  item: Item;
  onPressItem: ({ key }: Item) => void;
  screens: Screens;
};
export function MainScreenItem({
  item,
  onPressItem,
  screens,
}: MainScreenItemProps): React.ReactElement {
  const { key } = item;
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPressItem(item)}>
      <Text style={styles.buttonText}>{screens[key].title || key}</Text>
    </TouchableOpacity>
  );
}

const Stack = createNativeStackNavigator();

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ title: '😎 Youngbin RN Examples', headerTitleAlign: 'center' }}
            children={(props) => <MainScreen {...props} />}
          />
          {Object.keys(SCREENS).map((name) => (
            <Stack.Screen
              key={name}
              name={name}
              getComponent={() => SCREENS[name].screen}
              options={{
                title: SCREENS[name].title || name,
                headerTitleAlign: 'center',
                headerShown: false,
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  buttonText: {
    backgroundColor: 'transparent',
    color: '#000',
  },
  button: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
