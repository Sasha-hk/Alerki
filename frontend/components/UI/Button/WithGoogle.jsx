import useTranslation from 'next-translate/useTranslation'
import Button from './Button'


const WithGoogle = () => {
    const {t} = useTranslation('common')

    const withGoogleUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' +
        'scope=https://www.googleapis.com/auth/userinfo.profile&' +
        'access_type=offline&' +
        'include_granted_scopes=true&' +
        'response_type=code&' +
        'state=state_parameter_passthrough_value&' +
        'client_id=' + process.env.GOOGLE_CLIENT_ID + '&' +
        'redirect_uri=' + process.env.GOOGLE_REDIRECT_URL
    
    return (
        <a href={withGoogleUrl}>
            <Button className="big google compact stratch">
                <svg className="mr-1" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.46519 8.19866V10.9307H13.2589C12.9058 12.6668 11.4277 13.6643 9.46519 13.6643C7.17929 13.6329 5.34271 11.7708 5.34271 9.48472C5.34271 7.1986 7.17929 5.33658 9.46519 5.30511C10.4154 5.30398 11.3363 5.63371 12.0698 6.2377L14.1281 4.17936C11.767 2.10367 8.31886 1.83669 5.66642 3.52422C3.01398 5.21174 1.79475 8.4482 2.67447 11.4664C3.55419 14.4845 6.32144 16.559 9.46519 16.5571C13.0016 16.5571 16.2173 13.9849 16.2173 9.48432C16.2119 9.051 16.1588 8.61958 16.059 8.19786L9.46519 8.19866Z" fill="white" />
                </svg>

                {t('continue_with_Google')}
            </Button>
        </a>
    )
}


export default WithGoogle
