import React from 'react';
import {
  FlatList,
  LogBox,
  Platform,
  ScrollView,
  Text,
  View,
  StyleSheet,
  UIManager,
} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Kakaotalk } from './src/screens/Kakaotalk';
import { Calculator } from './src/screens/Calculator';
import { TodoApp } from './src/screens/TodoApp';
import { Kakaobus } from './src/screens/Kakaobus';
import { Translation } from './src/screens/Translation';

LogBox.ignoreLogs(['Calling `getNode()`']);

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type Screens = Record<string, { screen: React.ComponentType; title?: string }>;

const SCREENS: Screens = {
  KaKaoTalk: {
    screen: Kakaotalk,
    title: 'KakaoTalk',
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
    <RectButton style={styles.button} onPress={() => onPressItem(item)}>
      <Text style={styles.buttonText}>{screens[key].title || key}</Text>
    </RectButton>
  );
}

const Stack = createNativeStackNavigator();

const rnzip = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      options={{ title: '😎 Youngbin RN Examples' }}
      children={(props) => <MainScreen {...props} />}
    />
    {Object.keys(SCREENS).map((name) => (
      <Stack.Screen
        key={name}
        name={name}
        getComponent={() => SCREENS[name].screen}
        options={{ title: SCREENS[name].title || name, headerShown: false }}
      />
    ))}
  </Stack.Navigator>
);

function App(): React.ReactElement {
  return <NavigationContainer>{rnzip()}</NavigationContainer>;
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
