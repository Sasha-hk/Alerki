module.exports = {
    rushUsers: [
        {
            email: 'email@gmail.com', username: '3', firstName: 'Oleg', lastName: 'Ivanov', profileType: 'client', password: 'qwrty',
        },
        {
            email: '1@gmail.com', username: '2', firstName: 'Igor', lastName: 'Mich', profileType: 'worker', password: '1245',
        },
        {
            email: 'michi@gmail.com', username: '1', firstName: 'Mich', lastName: 'Ilock', profileType: 'client', password: 'password',
        },
    ],
    badUsers: [
        {
            firstName: 'Oleg', lastName: 'Ivanov', profileType: 'client', password: 'qwrty',
        },
        {
            email: '1a1231fsd@gmail.com', lastName: 'Mich', profileType: 'worker', password: '1245',
        },
        {
            email: 'miasfdchi@gmail.com', firstName: 'Mich', profileType: 'client', password: 'password',
        },
        {
            email: 'mi1cvhif@gmail.com', firstName: 'Mich', lastName: 'LName', password: 'password',
        },
        {
            email: 'michi@gmail.com', firstName: 'Mich', lastName: 'LName', profileType: 'client', 
        },
    ],
    sameEmail: {
        email: 'michi@gmail.com', username: '123', firstName: 'Em1', lastName: 'E1', profileType: 'worker', password: '1pass',
    },
    userProfiles: {
        client: {
            email: 'client@gmail.com', username: '251', firstName: 'ClientN', lastName: 'ClientL', profileType: 'client', password: 'password',
            accessToken: '', refreshToken: '',
        },
        worker: {
            email: 'worker@gmail.com', username: '5ksfa', firstName: 'WorkerN', lastName: 'WorkerL', profileType: 'worker', password: 'password',
            accessToken: '', refreshToken: '',
        },
    },
}