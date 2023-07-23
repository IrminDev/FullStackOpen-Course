import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;


function App() {
  const [diarys, setDiarys] = useState<DiaryEntry[]>([])

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3001/api/diaries').then(response => {
      setDiarys(response.data)
    })
  }, [])

  return (
    <div className="App">
      {diarys.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date} {diary.weather} {diary.visibility}</h3>
          <p>{diary.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
