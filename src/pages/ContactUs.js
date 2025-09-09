import { Helmet } from "react-helmet";

const ContactUs = () => {
    return (
        <>
            <Helmet>
                <title>Contact the team at Oil Changers</title>
            </Helmet>
            <div className="flex flex-col gap-5 w-screen">
                <img src="https://oilchangers.com/wp-content/uploads/2021/07/iStock-11649150571-scaled.jpg" alt="Contact Us" className="bg-black max-h-[40vh] object-cover" />
                <div className="py-[100px] px-5 md:px-0 flex flex-col items-center">
                    <div className="md:w-[40%] flex flex-col gap-10 items-center">
                        <div className="flex gap-5 items-center justify-between md:w-[80%]">
                            <div className="hidden sm:block border-solid border-y-[3px] border-[#fcca46] w-[80px] h-[18px]"></div>
                            <div className="text-4xl uppercase italic font-semibold">Get in touch</div>
                            <div className="hidden sm:block border-solid border-y-[3px] border-[#fcca46] w-[80px] h-[18px]"></div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <section className="flex flex-col gap-5">
                                <p className="text-center">We like to think we’re easy to talk to! Email us, give us a ring, or mail us a letter (if you’re into that). For the fastest response to customer service matters, please include your vehicle information in your message.</p>
                                <div className="font-semibold">Oil Changers Headquarters</div>
                                <p>
                                    <a href="tel:1-800-640-2405" className="text-[#006edf] hover:underline">1-800-640-2405</a> | <a href="mailto:support@oilchangers.com" className="text-[#006edf] hover:underline">support@oilchangers.com</a></p>
                                <p>4511 Willow Rd, Suite 1 Pleasanton, CA 94588</p>
                            </section>

                            <section className="flex flex-col gap-5">
                                <div className="font-semibold">Human Resources</div>
                                <p>For employment verification requests, please email <a href="mailto:payroll@oilchangers.com" className="text-[#006edf] hover:underline">payroll@oilchangers.com</a></p>
                                <p>4511 Willow Rd, Suite 1 Pleasanton, CA 94588</p>
                            </section>

                            <section className="flex flex-col gap-2">
                                <div className="font-semibold">Corporate Hours</div>
                                <p>Mon - Fri: 8 am - 5 pm PST</p>
                                <p>Sat - Closed</p>
                                <p>Sun - Closed</p>
                            </section>

                        </div>
                    </div>

                    <div className="mt-24 flex flex-col gap-5 font-[100] items-center">
                        <div className="text-3xl italic !font-semibold text-[#161922]">Take a 60-Second Survey</div>
                        <p>We’d love to hear your thoughts! Complete this survey to leave feedback about your experience at Oil Changers.</p>
                        <a
                            className="max-w-fit uppercase font-medium text-sm bg-primary text-black italic py-2 px-4 font-sm hover:text-white hover:bg-black"
                            href="https://app.reviewtrackers.com/pages/feedback/632a31394db2390400de4af2?request_page_id=632a31367b5341040050fbd6&type=microsurvey&resource_id=63d42054986cc83e881038c5"
                            target="_blank"
                            rel="noopener noreferrer">
                            Take our survey
                        </a>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ContactUs;