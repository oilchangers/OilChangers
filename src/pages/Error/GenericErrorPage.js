import ButtonLink from '../../components/ButtonLink/ButtonLink';

const GenericErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-5 h-[90vh]">
            <h1 className="text-5xl font-bold">Oops! Something went wrong.</h1>
            <p className="text-xl max-w-[60%] text-center">We're sorry, but an unexpected error occurred. Please try again.</p>
            <ButtonLink href="/" className="max-w-min">
                Go back to the home page
            </ButtonLink>
        </div >
    )
}

export default GenericErrorPage;