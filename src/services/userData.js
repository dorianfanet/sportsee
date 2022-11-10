import fetchData from "./fetchData"
import caloriesIcon from '../assets/calories.svg'
import proteinsIcon from '../assets/proteins.svg'
import carbsIcon from '../assets/carbs.svg'
import lipidsIcon from '../assets/lipids.svg'

const apiUrl = 'http://localhost:3000'

/**
 * @typedef {Object} UserInfos
 * @property {String} firstName - First name of user
 * @property {String} lastName - Last name of user
 * @property {number} score - Score of user
 * @property {Array} keyData - Key data of user
 */

/**
 * @typedef {Array} UserActivity
 * @property {String} day - Date of data
 * @property {number} kilogram - Weight of user this day
 * @property {number} score - Calories burnt this day
 */

/**
 * @typedef {Array} AverageSessions
 * @property {String} day - Day of the week
 * @property {number} sessionLength - Length of the session
 */

/**
 * @typedef {Array} UserPerformance
 * @property {number} value - Value of performance
 * @property {String} kind - Kind of performance associated with value
 */

export default class userData {

  /**
   * 
   * @param {number} id - ID of the current user
   */
  constructor(id) {
    this.id = id
  }

  /**
   * Fetch main user data
   * @returns {Promise<UserInfos>}
   */
  async getUserInfos() {
    const response = await fetchData(`${apiUrl}/user/${this.id}`)
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

  /**
   * Fetch daily activity data
   * @returns {Promise<UserActivity>}
   */
  async getUserActivity() {
    const response = await fetchData(`${apiUrl}/user/${this.id}/activity`)
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
  
  /**
   * Fetch average sessions data
   * @returns {Promise<AverageSessions>}
   */
  async getUserAverageSessions() {
    const response = await fetchData(`${apiUrl}/user/${this.id}/average-sessions`)
    const data = response.sessions

    return data.map((item) => ({
      day: item.day,
      sessionLength: item.sessionLength
    }))
  }

  /**
   * Fetch user performance data
   * @returns {Promise<UserPerformance>}
   */
  async getUserPerformance() {
    const response = await fetchData(`${apiUrl}/user/${this.id}/performance`)
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
}