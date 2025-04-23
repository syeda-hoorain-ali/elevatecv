const empty =  {
    image: '/images/user.png',
    name: '',
    jobtitle: '',
    summary: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    template: '',
    interests: [''],
    languages: [{
        language: '',
        rating: 0,
    }],
    skills: [{
        name: '',
        rating: 0,
    }],
    experiences: [{
        title: '',
        company: '',
        city: '',
        startDate: new Date(),
        endDate: new Date(),
        summary: '',
    }],
    educations: [{
        universityName: '',
        startDate: new Date(),
        endDate: new Date(),
        degree: '',
        major: '',
    }],
}

export default empty;
