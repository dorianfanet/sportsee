import caloriesIcon from '../assets/calories.svg'
import proteinsIcon from '../assets/proteins.svg'
import carbsIcon from '../assets/carbs.svg'
import lipidsIcon from '../assets/lipids.svg'

export const USER_MAIN_DATA = [
  {
      id: 12,
      firstName: 'Karl',
      lastName: 'Dovineau',
      score: 15,
      keyData: [
        {
          type: 'calorieCount',
          name: 'Calories',
          icon: caloriesIcon,
          amount: 1830,
          unit: 'kCal'
        },
        {
          type: 'proteinCount',
          name: 'Protéines',
          icon: proteinsIcon,
          amount: 155,
          unit: 'g'
        },
        {
          type: 'carbohydrateCount',
          name: 'Glucides',
          icon: carbsIcon,
          amount: 290,
          unit: 'g'
        },
        {
          type: 'lipidCount',
          name: 'Lipides',
          icon: lipidsIcon,
          amount: 50,
          unit: 'g'
        }
      ]
  },
  {
      id: 18,
      firstName: 'Cecilia',
      lastName: 'Ratorez',
      score: 30,
      keyData: [
        {
          type: 'calorieCount',
          name: 'Calories',
          icon: caloriesIcon,
          amount: 2500,
          unit: 'kCal'
        },
        {
          type: 'proteinCount',
          name: 'Protéines',
          icon: proteinsIcon,
          amount: 90,
          unit: 'g'
        },
        {
          type: 'carbohydrateCount',
          name: 'Glucides',
          icon: carbsIcon,
          amount: 150,
          unit: 'g'
        },
        {
          type: 'lipidCount',
          name: 'Lipides',
          icon: lipidsIcon,
          amount: 120,
          unit: 'g'
        }
      ]
  }
]

export const USER_ACTIVITY = [
  {
      id: 12,
      sessions: [
          {
              day: 'Mercredi 1',
              kilogram: 80,
              calories: 200
          },
          {
              day: 'Jeudi 2',
              kilogram: 80,
              calories: 220
          },
          {
              day: 'Vendredi 3',
              kilogram: 81,
              calories: 280
          },
          {
              day: 'Samedi 4',
              kilogram: 81,
              calories: 290
          },
          {
              day: 'Dimanche 5',
              kilogram: 80,
              calories: 160
          },
          {
              day: 'Lundi 6',
              kilogram: 78,
              calories: 162
          },
          {
              day: 'Mardi 7',
              kilogram: 76,
              calories: 390
          }
      ]
  },
  {
      id: 18,
      sessions: [
          {
              day: 'Mercredi 1',
              kilogram: 70,
              calories: 240
          },
          {
              day: 'Jeudi 2',
              kilogram: 69,
              calories: 220
          },
          {
              day: 'Vendredi 3',
              kilogram: 70,
              calories: 280
          },
          {
              day: 'Samedi 4',
              kilogram: 70,
              calories: 500
          },
          {
              day: 'Dimanche 5',
              kilogram: 69,
              calories: 160
          },
          {
              day: 'Lundi 6',
              kilogram: 69,
              calories: 162
          },
          {
              day: 'Mardi 7',
              kilogram: 69,
              calories: 390
          }
      ]
  }
]


export const USER_AVERAGE_SESSIONS = [
  {
      id: 12,
      sessions: [
          {
              day: 1,
              sessionLength: 30
          },
          {
              day: 2,
              sessionLength: 23
          },
          {
              day: 3,
              sessionLength: 45
          },
          {
              day: 4,
              sessionLength: 50
          },
          {
              day: 5,
              sessionLength: 0
          },
          {
              day: 6,
              sessionLength: 0
          },
          {
              day: 7,
              sessionLength: 30
          }
      ]
  },
  {
      id: 18,
      sessions: [
          {
              day: 1,
              sessionLength: 30
          },
          {
              day: 2,
              sessionLength: 40
          },
          {
              day: 3,
              sessionLength: 50
          },
          {
              day: 4,
              sessionLength: 30
          },
          {
              day: 5,
              sessionLength: 30
          },
          {
              day: 6,
              sessionLength: 50
          },
          {
              day: 7,
              sessionLength: 50
          }
      ]
  }
]


export const USER_PERFORMANCE = [
  {
      id: 12,
      data: [
          {
              value: 180,
              kind: 'Cardio'
          },
          {
              value: 120,
              kind: 'Énergie'
          },
          {
              value: 140,
              kind: 'Endurance'
          },
          {
              value: 50,
              kind: 'Force'
          },
          {
              value: 200,
              kind: 'Vitesse'
          },
          {
              value: 90,
              kind: 'Intensité'
          }
      ]
  },
  {
      id: 18,
      data: [
          {
              value: 200,
              kind: 'Cardio'
          },
          {
              value: 240,
              kind: 'Énergie'
          },
          {
              value: 80,
              kind: 'Endurance'
          },
          {
              value: 80,
              kind: 'Force'
          },
          {
              value: 220,
              kind: 'Vitesse'
          },
          {
              value: 110,
              kind: 'Intensité'
          }
      ]
  }
]
