import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, FlatList, SafeAreaView} from 'react-native';
import { Image } from 'expo-image';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = { title: string, id: string };

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text >{title}</Text>
  </View>
);

export default function App() {
  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleRow}>
          <View style={{
            flexDirection: "column",
          }}>
            <Text style={{
              ...styles.baseText,
              fontWeight: "300",
              fontSize: 20,
              color: colors.darkerText
            }}>Bem vindo,</Text>
            <Text style={{
              ...styles.baseText,
              fontWeight: "700",
              fontSize: 20,
              color: colors.lighterText
            }}>Vinicius Amélio!</Text>
          </View>
          <Pressable onPress={() => { console.log("action")}}>
            <View style={{
              height: 60,
              width:60,
            }}>
              <Image
                source="https://avatars.githubusercontent.com/u/49645556?v=4"
                contentFit="cover"
                style={{
                  flex: 1,
                  width: '100%',
                  borderRadius: 100
                }}
              ></Image>
            </View>
          </Pressable>
        </View>
        <Text style={{
          color: colors.darkerText,
          fontSize:14,
          marginTop: 16
        }}>
          Aqui você consegue ver os <Text style={{color: colors.primary}}>#praises</Text> recentes.
          Que tal mandar um pra aquele parça que sempre te ajuda no trampo? 
        </Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} id={item.id} />}
        keyExtractor={item => item.id}
      />
      <StatusBar style='light'></StatusBar>
      <View style={{
        zIndex: 100,
        right: 0,
        top: "50%",
        height: 40,
        width: 40,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: "#373640",
        position: "absolute",
      }} />
    </SafeAreaView>
    
  );
}

const colors = {
  primary: "#8388ED",
  darkerGreen: "#47bf89",
  background: "#222328",
  foreground: "#E1E1E6",
  neutralDarker: "#41414D",
  darkerText: "#B7B7B7",
  lighterText: "#E0E0E0",
  elevatedColor: "#2C2B33"
}


const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.elevatedColor,
    padding: 12,
    marginVertical: 20,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headerContainer: {
    flexDirection: "column",
  },
  headerTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  baseText: {
    fontFamily: "Roboto",
  },
  button: {
    marginTop: 40,
    backgroundColor: colors.primary,
    color: colors.foreground,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    tintColor: colors.neutralDarker
  }
});
