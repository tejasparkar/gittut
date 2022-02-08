import './Form.css';
import { useState, useEffect } from 'react';
const Form = () => {
    const [firstName, setFirstName] = useState(''); // First Name 
    const updateFirstName = (name) => {
        setFirstName(name);
    };
    const [lastName, setLastName] = useState(''); // Last Name
    const updateLastName = (name) => {
        setLastName(name);
    };
    const [gender, setGender] = useState('') //Gender
    const updateGender = value => {
        setGender(value);
    };
    const [sliderValue , setSliderValue] = useState(0); // Rate Slider
    const updateSlider = e =>{
        setSliderValue(e.target.value)
    };
    const [file, setFile] = useState(''); //File Upload
    const updateFile = (fileName) => {
        setFile(fileName);
    };
    const [country, setCountry] = useState('0'); // Countries
    let [countryError, setCountryError] = useState(false);
    const updateCountry = (updatedCountry) => {
        setCountry(updatedCountry);
    };
    const [tnc, setTnC] = useState(false); //Terms and Conditions Checkbox
    const updateTnC = (newState) => {
        setTnC(newState);
    };
    const [offers, setOffers] = useState(false); //Offers Checkbox
    const updateOffers = (newState) => {
        setOffers(newState)
    };
    const handleSubmit = (ev) => {
        ev.preventDefault();
        if(country === '0') {
            setCountryError(true);
        } else {
            setCountryError(false);
        }
        console.log(ev);
    };
    const cancel = (ev) => {
        ev.preventDefault();
        setOffers(false);
        setTnC(false);
        setCountry('0');
        setCountryError(false);
        setFile('');
        setSliderValue(0);
        setGender('');
        setLastName('');
        setFirstName('');

    }
    return (
        <div className="form">
            <h2>Sign Up</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                commodo viverra maecenas accumsan lacus vel tacilisis. t is a long established tact that a reader will be distracted by the readable content of a page when looking at its layout
                he point of usina Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to usina Content here, content here*, making it look like readable tnalish
            </p>
            <p className='mandatory'>Fields marked with (*) are mandatory.</p>
            <form className='form-group' onSubmit={handleSubmit}>
                <div className="container-md main-collection">
                    <div className="row firstRow">
                        <div className="col-md-6 form-group">
                            <label htmlFor="firstName">First Name:*</label>
                            <input type="text" name="firstName" id="firstName" className='form-control' required aria-required="true" value={firstName} onChange={(ev) => updateFirstName(ev.target.value)}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="screenshot">Screen Shot:</label>
                            <input type="file" name="screenshot" id="screenshot" className='form-control' value={file} onChange={(ev) => updateFile(ev.target.value)}/>
                        </div>
                    </div>
                    <div className="row secondRow">
                        <div className="col-md-6">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" name="lastName" id="lastName" className='form-control' value={lastName} onChange={(ev) => updateLastName(ev.target.value)}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="country">Country:*</label>{countryError}
                            <select className={`${countryError ? 'form-control countryError': 'form-control'}`} id='country'  defaultValue={country} onChange={(ev) => updateCountry(ev.target.value)}>
                                <option value="0">Select</option>
                                <option value="1">India</option>
                                <option value="2">South Africa</option>
                                <option value="3">Australia</option>
                            </select>
                            {countryError && <span htmlFor="country" style={{color: 'red'}}>Please Select a Country</span>}
                        </div>
                    </div>
                    <div className="row thirdRow">
                        <div className="col-md-6">
                            {/* <label htmlFor="gender">Gender:</label> */}
                            <fieldset className='border p-2'>
                                <legend htmlFor="gender" className='w-auto float-none'>Gender:</legend>
                                <div className='control-group'>
                                    <input type="radio" name="format" id="male" value="male" onChange={(ev) => { updateGender(ev.target.value) }} />
                                    <label htmlFor="male">Male</label>
                                </div>
                                <div>
                                    <input type="radio" name="format" id="female" value="female" onChange={(ev) => { updateGender(ev.target.value) }} />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </fieldset>
                        </div>
                        <div className="col-md-6 tnc">
                            <div className='terms'>
                                <input className="form-check-input" type="checkbox" value="" id="tnc" onChange={(ev) => { updateTnC(ev.target.checked)}}/>
                                <label className="form-check-label" htmlFor="tnc">
                                    Agree to <span>Terms and Conditions</span>
                                </label>
                            </div>
                            <div className='offers'>
                            <input className="form-check-input" type="checkbox" value="" id="offers" onChange={(ev) => {updateOffers(ev.target.checked)}}/>
                                <label className="form-check-label" htmlFor="offers">
                                    I consent to receive information about services and special offers by email
                                </label>
                            </div>
                            
                        </div>
                    </div>
                    <div className="row fourthRow">
                        <div className="col-md-6 wrapper">
                            <label htmlFor="rate">Rate yourself:*</label>
                            <input className="slider_btn" aria-valuetext={sliderValue} aria-valuemin={0} aria-valuemax={100} orient="vertical" type="range" min="0"  max="100" id="rate" value={sliderValue} onChange={updateSlider} /><div id="result">{sliderValue}</div>
                        </div>
                        <div className="col-md-6 btn-group">
                        <button type="submit" className="btn btn-submit">Submit</button>
                        <button type="button" className="btn btn-cancel" onClick={(ev) => cancel(ev)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Form;