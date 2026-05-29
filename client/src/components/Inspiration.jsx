import '../index.css';

const Inspiration = () => {
    const containerStyle = {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
    };

    const headingStyle = {
        color: '#ffffff',
        marginBottom: '20px',
        textAlign: 'center'
    };

    const paragraphStyle = {
        fontSize: '20px',
        lineHeight: '1.6',
        color: '#666',
        marginBottom: '15px',
        textAlign: 'justify'
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>The Grand Vision Behind rePaste</h1>
            <p style={paragraphStyle}>In the hallowed halls of academia, three prodigious minds converged to address a profound dilemma that had long plagued the intellectual elite: the ineffable challenge of sharing code with the precision and elegance it so richly deserves. Thus, rePaste was conceived, an online clipboard of unparalleled sophistication, meticulously crafted using the illustrious MERN stack.</p>
            <p style={paragraphStyle}>Our visionary creators, each a paragon of technical prowess, embarked on this noble quest with a singular purpose: to transcend the mundane and elevate the art of code sharing to an exalted plane. With rePaste, they have bestowed upon the world a tool of such refinement and utility that it stands as a testament to their boundless ingenuity and dedication.</p>
            <p style={paragraphStyle}>Every facet of rePaste has been meticulously engineered to cater to the discerning connoisseur of code. From its resplendent syntax highlighting, which supports a veritable pantheon of programming languages, to its seamless real-time collaboration capabilities, rePaste is the epitome of technological grandeur. Furthermore, its robust version control system ensures that every iteration of brilliance is preserved for posterity, allowing users to traverse the annals of their coding journey with unparalleled ease.</p>
            <p style={paragraphStyle}>In essence, rePaste is not merely an online clipboard; it is a magnum opus, a digital sanctuary where the sublime art of coding is celebrated and shared with the reverence it so rightly commands. Join us in this exalted endeavor, and experience the future of code sharing, today.</p>
        </div>
    );
};

export default Inspiration;