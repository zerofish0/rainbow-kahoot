import React, { useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { ApplicationProvider, Layout, Text, Input, Button, Card, } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import * as Clipboard from 'expo-clipboard';



export default function App() {
  const [input, setInput] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [Quiz, setQuiz] = useState<string[]>([
  ]);

  const extractQuizAndIds = (jsonData) => {
    if (!jsonData.entities) return [];

    return jsonData.entities
      .map(entity => {
        const card = entity.card;
        if (card && card.type === "quiz") {
          return [card.title, card.uuid];
        }
        return null; // ignore si pas un quiz
      })
      .filter(item => item !== null); // supprime les entrées null
  }

  const launchSearch = () => {
    setQuiz([]);

    if (input.trim() !== '') {
      let keywords = input
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
//      fetch(`https://kahoot.mauriceb.nl/s/${keywords}.json`)
//      fetch(`https://create.kahoot.it/rest/kahoots/?query=${keywords}&limit=20&orderBy=relevance&cursor=0&searchCluster=1&includeExtendedCounters=false&inventoryItemId=ANY`)
      const url = `https://create.kahoot.it/rest/kahoots/?query=${encodeURIComponent(input.trim().toLowerCase())}&limit=20&orderBy=relevance&cursor=0&searchCluster=1&includeExtendedCounters=false&inventoryItemId=ANY`;
      fetch(url, {method: "GET",headers: {"Accept": "application/json","Authorization": "Bearer eyJraWQiOiJTZmRDOUNBOHlyT2dhOEVMUWxEODFyWWV2d1NicEE5cWxTb0siLCJ0eXAiOiJhY2Nlc3Mrand0IiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJodHRwczovL2thaG9vdC5pdC9yZXN0Iiwic3ViIjoiNmIxM2FiNmMtYmVhYy00MmNhLWFlZTgtMjE0OWUzOTQ2Nzk1Iiwic2NvcGUiOiJvcGVuaWQgQUxMIiwiaXNzIjoiaHR0cHM6Ly9rYWhvb3QuaXQvcmVzdCIsImV4cCI6MTc2NjU1NDM0MiwiaWF0IjoxNzY1OTkyNzQyLCJqdGkiOiIxMmJhNTNjNS1iZmU2LTNlODctYmJlOC00ZDRiY2Q1MDcwNjAiLCJzaWQiOiJkY2E1NDBmMS1jM2M1LTRiOTUtYTA4MS1lYzhlMzhlMTg1OWEifQ.K3NtFahy4rzvTwaDUVNSQrHHGzsVGDTdRiV4stA4vRYGZntxJA-y4YG9GB5qKwkKIoHX7gUzjhVWlFr30uUEWfx28k3p7Qvb0r2TGkoPq85WkRLiXxAoa5TrrQW7LMgmPy1eb1JcupH3pW1ielvI-la5_VODgyz1k6TrgQ_VASpK5doNdsnDsolRNHYH2ilSAN4FX7sJ_exMg1ZuiYPircmkgsoY88VpEl_yMsCnR-BfgFQC87Ns8FNy_4OHoFfF7z4EXb-_6UL8kZ4SWMlem6OZpw8AhKMipVobnysW4nONkHwpDaHCj0enCWIViPkdUWRscFCn46MasuXSgC1MqA"},})
        .then(response => response.json())
        .then(json => {
          const list = extractQuizAndIds(json);
          setQuiz(list);
          setShowQuiz(true);
          setInput('');
        })
    };
  };

  const reset = ()=> {
    setShowQuiz(false);
    setInput('');
    setQuiz([])
  };

  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout style={styles.container}>
        <Layout style={styles.content}>
          <Text category="h1" style={styles.title}>
          <Text  category="h1" style={{ color: '#0083ff'}}>R</Text>
          <Text  category="h1" style={{ color: 'red'}}>a</Text>
          <Text  category="h1" style={{ color: 'yellow'}}>i</Text>
          <Text  category="h1" style={{ color: 'aqua'}}>n</Text>
          <Text  category="h1" style={{ color: 'lime'}}>b</Text>
          <Text  category="h1" style={{ color: 'magenta'}}>o</Text>
          <Text  category="h1" style={{ color: '#0083ff'}}>w </Text>
          <Text  category="h1" style={{ color: 'purple'}}>Kahoot!</Text>
          </Text>          
          <Layout style={styles.inputContainer}>
            <Input
              placeholder="Search for a quiz..."
              value={input}
              onChangeText={setInput}
              style={styles.input}
            />
          </Layout>

          <Button onPress={launchSearch} style={styles.button}>Search</Button>

          {showQuiz && (
            <FlatList
              data={Quiz}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <Card style={{ margin: 8, padding: 12 }}>
                  <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text category="s1" style={{ flex: 1 }}>
                      {item[0]}
                    </Text>
                    <Button size="small" onPress={() => Clipboard.setString(item[1])}>
                      Copier
                    </Button>
                  </Layout>
                </Card>
              )}
            />
          )}

        </Layout>
      <Button onPress={reset} style={styles.resetbutton}>Reset</Button>
      </Layout>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
//    backgroundColor: '#000000',
    justifyContent: 'center', // centre verticalement
    padding: 20
  },
  content: {
    flex: 1,
    justifyContent: 'center' // centre aussi les éléments à l’intérieur
  },
  title: {
    textAlign: 'center',
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  input: {
    flex: 1,
    marginRight: 10
  },
  button: {
    width: 200,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  resetbutton: {
    width: 200,
    backgroundColor: 'red', 
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
    borderColor: 'red',
    alignSelf: 'center'
  },
  listContainer: {
    paddingBottom: 20
  },
  card: {
    marginBottom: 10
  }
});
