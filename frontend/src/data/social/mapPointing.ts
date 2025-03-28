// Class 6 Map Pointing Questions
export const mapPointingClass6 = [
  {
    id: 1,
    title: 'Indian States and Capitals - Class 6',
    description: 'Basic states and capitals of India for Class 6 students.',
    questions: [
      {
        question: 'Identify the state highlighted on the map:',
        mapData: {
          center: [19.7515, 75.7139], // Center of Maharashtra
          zoom: 6,
          marker: [19.7515, 75.7139],
          highlightState: 'maharashtra'
        },
        options: ['Gujarat', 'Maharashtra', 'Karnataka', 'Telangana'],
        correct: 'Maharashtra'
      },
      {
        question: 'Which state in southern India is highlighted on this map?',
        mapData: {
          center: [11.1271, 78.6569], // Center of Tamil Nadu
          zoom: 6,
          marker: [11.1271, 78.6569],
          highlightState: 'tamilnadu'
        },
        options: ['Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh'],
        correct: 'Tamil Nadu'
      },
      {
        question: 'Identify the capital city marked with a star:',
        mapData: {
          center: [17.3850, 78.4867], // Hyderabad
          zoom: 8,
          marker: [17.3850, 78.4867],
          markerType: 'capital'
        },
        options: ['Mumbai', 'Chennai', 'Hyderabad', 'Bangalore'],
        correct: 'Hyderabad'
      }
    ]
  },
  {
    id: 2,
    title: 'Indian Geography Basics - Class 6',
    description: 'Learn basic geographical features of India.',
    questions: [
      {
        question: 'Identify the river flowing through the highlighted area:',
        mapData: {
          center: [18.8002, 79.6940], // Godavari River
          zoom: 7,
          marker: [18.8002, 79.6940],
          highlightFeature: 'river',
          riverName: 'godavari'
        },
        options: ['Ganga', 'Brahmaputra', 'Krishna', 'Godavari'],
        correct: 'Godavari'
      },
      {
        question: 'Which large water body is located to the east of India?',
        mapData: {
          center: [15.0000, 88.0000], // Bay of Bengal
          zoom: 5,
          marker: [15.0000, 88.0000],
          highlightFeature: 'sea',
          seaName: 'bay_of_bengal'
        },
        options: ['Bay of Bengal', 'Arabian Sea', 'Indian Ocean', 'Andaman Sea'],
        correct: 'Bay of Bengal'
      }
    ]
  }
];

// Class 7 Map Pointing Questions
export const mapPointingClass7 = [
  {
    id: 1,
    title: 'Indian Rivers and Water Bodies - Class 7',
    description: 'Identify major rivers and water bodies in India.',
    questions: [
      {
        question: 'Which river forms a delta in the highlighted region?',
        mapData: {
          center: [16.2500, 80.6500], // Krishna Delta
          zoom: 7,
          marker: [16.2500, 80.6500],
          highlightFeature: 'delta',
          riverName: 'krishna'
        },
        options: ['Kaveri', 'Krishna', 'Mahanadi', 'Narmada'],
        correct: 'Krishna'
      },
      {
        question: 'Identify the lake marked on this map:',
        mapData: {
          center: [19.7000, 85.3500], // Chilika Lake
          zoom: 9,
          marker: [19.7000, 85.3500],
          highlightFeature: 'lake',
          lakeName: 'chilika'
        },
        options: ['Chilika Lake', 'Wular Lake', 'Pulicat Lake', 'Vembanad Lake'],
        correct: 'Chilika Lake'
      }
    ]
  },
  {
    id: 2,
    title: 'Neighboring Countries - Class 7',
    description: 'Learn about countries that share borders with India.',
    questions: [
      {
        question: 'Which neighboring country is located to the north of India?',
        mapData: {
          center: [28.3949, 84.1240], // Nepal
          zoom: 6,
          marker: [28.3949, 84.1240],
          highlightFeature: 'country',
          countryName: 'nepal'
        },
        options: ['Nepal', 'Bangladesh', 'Myanmar', 'Pakistan'],
        correct: 'Nepal'
      },
      {
        question: 'Identify the country that shares the longest land border with India:',
        mapData: {
          center: [23.6850, 90.3563], // Bangladesh
          zoom: 6,
          marker: [23.6850, 90.3563],
          highlightFeature: 'country',
          countryName: 'bangladesh'
        },
        options: ['Pakistan', 'Bangladesh', 'China', 'Nepal'],
        correct: 'Bangladesh'
      }
    ]
  }
];

// Class 8 Map Pointing Questions
export const mapPointingClass8 = [
  {
    id: 1,
    title: 'Indian Mountain Ranges - Class 8',
    description: 'Identify important mountain ranges in India.',
    questions: [
      {
        question: 'Identify the mountain range highlighted on this map:',
        mapData: {
          center: [13.0000, 75.5000], // Western Ghats
          zoom: 6,
          marker: [13.0000, 75.5000],
          highlightFeature: 'mountain',
          mountainName: 'western_ghats'
        },
        options: ['Western Ghats', 'Eastern Ghats', 'Himalayas', 'Aravalli Range'],
        correct: 'Western Ghats'
      },
      {
        question: 'Which mountain range is located in the highlighted area?',
        mapData: {
          center: [25.0000, 73.5000], // Aravalli Range
          zoom: 6,
          marker: [25.0000, 73.5000],
          highlightFeature: 'mountain',
          mountainName: 'aravalli'
        },
        options: ['Vindhya Range', 'Satpura Range', 'Aravalli Range', 'Eastern Ghats'],
        correct: 'Aravalli Range'
      }
    ]
  },
  {
    id: 2,
    title: 'Indian States and Their Features - Class 8',
    description: 'Learn about unique geographical features of Indian states.',
    questions: [
      {
        question: 'Which state contains the highlighted hill station?',
        mapData: {
          center: [31.1048, 77.1735], // Shimla
          zoom: 9,
          marker: [31.1048, 77.1735],
          highlightFeature: 'city',
          cityName: 'shimla',
          stateName: 'himachal_pradesh'
        },
        options: ['Himachal Pradesh', 'Uttarakhand', 'Sikkim', 'Arunachal Pradesh'],
        correct: 'Himachal Pradesh'
      },
      {
        question: 'Which state is located at the southern tip of India?',
        mapData: {
          center: [11.1271, 78.6569], // Tamil Nadu
          zoom: 5,
          marker: [8.0883, 77.5385], // Kanyakumari
          highlightArea: 'southern_tip'
        },
        options: ['Kerala', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh'],
        correct: 'Tamil Nadu'
      }
    ]
  }
];

// Class 9 Map Pointing Questions
export const mapPointingClass9 = [
  {
    id: 1,
    title: 'Telangana Geography - Class 9',
    description: 'Learn about important geographical features of Telangana.',
    questions: [
      {
        question: 'Identify the district marked on this map of Telangana:',
        mapData: {
          center: [17.9689, 79.5941], // Warangal
          zoom: 8,
          marker: [17.9689, 79.5941],
          highlightFeature: 'district',
          districtName: 'warangal'
        },
        options: ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam'],
        correct: 'Warangal'
      },
      {
        question: 'Which river is highlighted on this map of Telangana?',
        mapData: {
          center: [18.8002, 79.6940], // Godavari River in Telangana
          zoom: 7,
          marker: [18.8002, 79.6940],
          highlightFeature: 'river',
          riverName: 'godavari',
          stateName: 'telangana'
        },
        options: ['Godavari', 'Krishna', 'Musi', 'Manjira'],
        correct: 'Godavari'
      },
      {
        question: 'Identify the reservoir marked on this map:',
        mapData: {
          center: [16.5716, 79.3119], // Nagarjuna Sagar
          zoom: 9,
          marker: [16.5716, 79.3119],
          highlightFeature: 'reservoir',
          reservoirName: 'nagarjuna_sagar'
        },
        options: ['Nagarjuna Sagar', 'Srisailam', 'Nizamsagar', 'Singur'],
        correct: 'Nagarjuna Sagar'
      }
    ]
  },
  {
    id: 2,
    title: 'World Geography Basics - Class 9',
    description: 'Identify basic world geographical features.',
    questions: [
      {
        question: 'Identify the country highlighted on this world map:',
        mapData: {
          center: [-25.2744, 133.7751], // Australia
          zoom: 4,
          marker: [-25.2744, 133.7751],
          highlightFeature: 'country',
          countryName: 'australia'
        },
        options: ['Brazil', 'Australia', 'China', 'Russia'],
        correct: 'Australia'
      },
      {
        question: 'Which continent is highlighted on this map?',
        mapData: {
          center: [8.7832, 17.5731], // Africa
          zoom: 3,
          marker: [8.7832, 17.5731],
          highlightFeature: 'continent',
          continentName: 'africa'
        },
        options: ['Africa', 'South America', 'North America', 'Europe'],
        correct: 'Africa'
      }
    ]
  }
];

// Class 10 Map Pointing Questions
export const mapPointingClass10 = [
  {
    id: 1,
    title: 'Advanced World Geography - Class 10',
    description: 'Advanced study of world geographical features.',
    questions: [
      {
        question: 'Identify the ocean marked on this world map:',
        mapData: {
          center: [0.0000, 75.0000], // Indian Ocean
          zoom: 3,
          marker: [0.0000, 75.0000],
          highlightFeature: 'ocean',
          oceanName: 'indian'
        },
        options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
        correct: 'Indian Ocean'
      },
      {
        question: "Which country's capital is marked on this map?",
        mapData: {
          center: [35.6762, 139.6503], // Tokyo
          zoom: 7,
          marker: [35.6762, 139.6503],
          highlightFeature: 'capital',
          capitalName: 'tokyo',
          countryName: 'japan'
        },
        options: ['Japan', 'South Korea', 'China', 'Thailand'],
        correct: 'Japan'
      },
      {
        question: 'Identify the desert region highlighted on this map:',
        mapData: {
          center: [25.0000, 0.0000], // Sahara Desert
          zoom: 4,
          marker: [25.0000, 0.0000],
          highlightFeature: 'desert',
          desertName: 'sahara'
        },
        options: ['Sahara Desert', 'Arabian Desert', 'Gobi Desert', 'Thar Desert'],
        correct: 'Sahara Desert'
      }
    ]
  },
  {
    id: 2,
    title: 'Historical Maps - Class 10',
    description: 'Study historical maps to understand territorial changes over time.',
    questions: [
      {
        question: 'Identify the empire shown in this historical map of India:',
        mapData: {
          center: [22.5937, 78.9629], // Center of India
          zoom: 5,
          marker: [22.5937, 78.9629],
          highlightFeature: 'historical',
          empireType: 'maurya',
          periodName: 'ancient_india'
        },
        options: ['Maurya Empire', 'Mughal Empire', 'Maratha Empire', 'Gupta Empire'],
        correct: 'Maurya Empire'
      },
      {
        question: 'Which territorial division is shown in this map of British India?',
        mapData: {
          center: [23.0000, 87.0000], // Bengal region
          zoom: 5,
          marker: [23.0000, 87.0000],
          highlightFeature: 'historical',
          regionType: 'presidency',
          regionName: 'bengal',
          periodName: 'british_india'
        },
        options: ['Bengal Presidency', 'Madras Presidency', 'Bombay Presidency', 'United Provinces'],
        correct: 'Bengal Presidency'
      },
      {
        question: 'This map represents which period in Indian history?',
        mapData: {
          center: [22.5937, 78.9629], // Center of India
          zoom: 5,
          marker: [22.5937, 78.9629],
          highlightFeature: 'historical',
          periodType: 'political',
          periodName: 'post_independence',
          showModernBoundaries: true
        },
        options: ['Pre-Independence India', 'Post-Independence India', 'British Raj', 'Ancient India'],
        correct: 'Post-Independence India'
      }
    ]
  }
];