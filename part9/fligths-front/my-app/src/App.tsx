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

enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

const DiaryEntry = (props: DiaryEntry) => {
  return (
    <div>
      <h3>{props.date}</h3>
      <p>weather: {props.weather}</p>
      <p>visibility: {props.visibility}</p>
    </div>
  )
}

const Notification = ({notification}: {notification: string}) => {
  if(notification === '') {
    return null
  }

  return (
    <div>
      {notification}
    </div>
  )
}

const DiaryForm = ({handleSubmit} : {handleSubmit: (diary: NewDiaryEntry) => void}) => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')

  const onWeatherChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value)
  }

  const onVisibilityChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value)
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitting form...')
    const newDiaryEntry = {
      date,
      weather,
      visibility,
      comment
    } as NewDiaryEntry

    console.log(newDiaryEntry)

    handleSubmit(newDiaryEntry)
  }

  return (
    <div>
      <h3>Add new entry</h3>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="date">Date</label>
          <input onChange={(event: React.ChangeEvent<HTMLInputElement>) =>{
            setDate(event.target.value)
          }} type="date" id="date" name="date" />
        </div>
        <div>
          <label htmlFor="weather">Weather</label>
          <input onChange={onWeatherChanged} checked={weather === 'sunny'} type='radio' value='sunny' name='weather' id='weather' />sunny
          <input onChange={onWeatherChanged} checked={weather === 'rainy'} type='radio' value='rainy' name='weather' id='weather' />rainy
          <input onChange={onWeatherChanged} checked={weather === 'cloudy'} type='radio' value='cloudy' name='weather' id='weather' />cloudy
          <input onChange={onWeatherChanged} checked={weather === 'stormy'} type='radio' value='stormy' name='weather' id='weather' />stormy
          <input onChange={onWeatherChanged} checked={weather === 'windy'} type='radio' value='windy' name='weather' id='weather'/>windy
        </div>
        <div>
          <label htmlFor="visibility">Visibility</label>
          <input onChange={onVisibilityChanged} checked={visibility === 'great'} type='radio' value='great' name='visibility' id='visibility' />great
          <input onChange={onVisibilityChanged} checked={visibility === 'good'} type='radio' value='good' name='visibility' id='visibility' />good
          <input onChange={onVisibilityChanged} checked={visibility === 'ok'} type='radio' value='ok' name='visibility' id='visibility' />ok
          <input onChange={onVisibilityChanged} checked={visibility === 'poor'} type='radio' value='poor' name='visibility' id='visibility' />poor
        </div>
        <label htmlFor="comment">Comment</label>
        <input onChange={
          (event: React.ChangeEvent<HTMLInputElement>) => {
            setComment(event.target.value)
          }
        } type='text' id='comment' name='comment' />

        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

function App() {
  const [diarys, setDiarys] = useState<DiaryEntry[]>([])
  const [notification, setNotification] = useState('')

  const addDiary = (diary: NewDiaryEntry) => {
      axios.post<DiaryEntry>('http://localhost:3001/api/diaries', diary).then(response => {
      setDiarys(diarys.concat(response.data))
      })
      .catch(error => {
        if(axios.isAxiosError(error)) {
          setNotification(error.response?.data)
          setTimeout(() => {
            setNotification('')
          }, 5000)
        } else {
          setNotification('Something went wrong')
          setTimeout(() => {
            setNotification('')
          }, 5000)
        }
      })
  }


  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3001/api/diaries').then(response => {
      setDiarys(response.data)
    })
  }, [])

  return (
    <div className="App">
      <Notification notification={notification} />
      <DiaryForm handleSubmit={addDiary} />
      {diarys.map(diary => (
        <DiaryEntry key={diary.id} {...diary} />
      ))}
    </div>
  );
}

export default App;
