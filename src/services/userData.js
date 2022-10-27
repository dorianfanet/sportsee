import request from "./request"
import caloriesIcon from '../assets/calories.svg'
import proteinsIcon from '../assets/proteins.svg'
import carbsIcon from '../assets/carbs.svg'
import lipidsIcon from '../assets/lipids.svg'

const apiUrl = 'http://localhost:3000'

export default class userData {

  constructor(id) {
    this.id = id
  }

  async getUserInfos() {
    const response = await request(`${apiUrl}/user/${this.id}`)
    const data = response

    return {
      firstName: data.userInfos.firstName,
      lastName: data.userInfos.lastName,
      score: (data.score || data.todayScore) * 100,
      keyData: [
        {
          type: 'calorieCount',
          name: 'Calories',
          icon: caloriesIcon,
          amount: data.keyData.calorieCount,
          unit: 'kCal'
        },
        {
          type: 'proteinCount',
          name: 'Protéines',
          icon: proteinsIcon,
          amount: data.keyData.proteinCount,
          unit: 'g'
        },
        {
          type: 'carbohydrateCount',
          name: 'Glucides',
          icon: carbsIcon,
          amount: data.keyData.carbohydrateCount,
          unit: 'g'
        },
        {
          type: 'lipidCount',
          name: 'Lipides',
          icon: lipidsIcon,
          amount: data.keyData.lipidCount,
          unit: 'g'
        }
      ]
    }
  }

  async getUserActivity() {
    const response = await request(`${apiUrl}/user/${this.id}/activity`)
    const data = response.sessions

    const days = [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi'
    ]

    return data.map((item) => ({
      day: `${days[new Date(item.day).getDay()]} ${new Date(item.day).getDate()}`,
      kilogram: item.kilogram,
      calories: item.calories
    }))
  }

  async getUserPerformance() {
    const response = await request(`${apiUrl}/user/${this.id}/performance`)
    const data = response

    const formattedKinds = {
      cardio: 'Cardio', 
      energy: 'Énergie',
      endurance: 'Endurance',
      strength: 'Force',
      speed: 'Vitesse',
      intensity: 'Intensité'
    }

    return data.data.map((item, index) => ({
      value: item.value,
      kind: `${formattedKinds[data.kind[item.kind]]}`
    }))
  }

  async getUserAverageSessions() {
    const response = await request(`${apiUrl}/user/${this.id}/average-sessions`)
    const data = response.sessions

    return data.map((item) => ({
      day: item.day,
      sessionLength: item.sessionLength
    }))
  }
}