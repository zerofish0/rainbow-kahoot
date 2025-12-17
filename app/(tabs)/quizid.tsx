import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ApplicationProvider, Layout, Text, Input, Button, Card } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';


export default function App() {
  const [input, setInput] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);
  const [Answers, setAnswers] = useState<string[]>([
  ]);

  const getAnswers = () => {
    if (input.trim() !== '') {
      fetch("https://play.kahoot.it/rest/kahoots/"+input.trim())
        .then(response => response.json())
        .then(json => {
          const list = extractQuestionsAnswers(json);
          setAnswers(list);
          setShowAnswers(true);
          setInput('');
        })
        .catch(error => {
          setAnswers([`Erreur récupération Kahoot : ${error}`]);
          setShowAnswers(true);
          setInput('');
        });
    }
  };

  const reset = ()=> {
    setShowAnswers(false);
    setInput('');
    setAnswers([])
  };

  const extractQuestionsAnswers = (jsonData) => {
    const result = [];

    if (!jsonData.questions) return result;

    jsonData.questions.forEach(q => {
      let questionText = q.question || "";
      // enlève balises <i> si nécessaire
      questionText = questionText.replace(/<i>/g, "").replace(/<\/i>/g, "");

      let answer = null;

      if (q.choices && q.choices.length > 0) {
        // cherche la réponse correcte
        const correctChoice = q.choices.find(c => c.correct);
        answer = correctChoice ? correctChoice.answer : q.choices[0].answer;
      }

      if (questionText && answer) {
        result.push([questionText, answer]);
      }
    });

  return result;
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
              placeholder="Enter quizId"
              value={input}
              onChangeText={setInput}
              style={styles.input}
            />
          </Layout>
          <Button onPress={getAnswers} style={styles.button}>Get Answers</Button>

          {showAnswers && (
            <FlatList
              data={Answers}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <Text>
                  {item[0]}
                  {"\n"}
                  {"➡️ " + item[1]}
                </Text>
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
    alignSelf: 'center'
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
