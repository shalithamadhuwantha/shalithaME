'use client'

export default function ContactModal() {
  const hideModal = () => {
    const modal = document.getElementById('contactmebg');
    if (modal) modal.style.visibility = 'hidden';
  }

  return (
    <div id="contactmebg" className="invisible fixed z-[7] w-full h-full bg-[#232323ae] top-0 left-0">
      {/* Close Button */}
      <div id="closecont" onClick={hideModal} className="text-2xl float-right mr-4 mt-4 cursor-pointer hover:text-red-500">
        <i className="fa-solid fa-xmark"></i>
      </div>

      <div id="contactme" className="w-2/5 h-3/5 bg-[#1b1b1b] fixed z-[9] top-[15%] left-[30%] rounded-[25px] p-5">
        <div className="flex flex-row mt-5 mb-2.5">
          <div className="typeH text-custom-typeH text-2xl font-playfair"></div>
          <span id="contacttype" className="text-2xl font-playfair text-custom-text"></span>
        </div>
        <br />

        {/* Contact Table */}
        <table className="w-full border-collapse text-custom-text2 font-space-mono">
          <tbody>
            <tr>
              <td className="w-[10%] p-5">
                <i className="fa-regular fa-envelope text-custom-heading"></i>
              </td>
              <td className="w-[90%]">
                <p className="text-left text-custom-heading m-0 p-0">E-mail</p>
                <a href="mailto:hello@shalitha.me" className="text-left text-custom-text2 no-underline">hello@shalitha.me</a>
              </td>
            </tr>
            <tr>
              <td className="w-[10%] p-5">
                <i className="fa-solid fa-phone text-custom-heading"></i>
              </td>
              <td className="w-[90%]">
                <p className="text-left text-custom-heading m-0 p-0">Phone</p>
                <a href="https://wa.me/+9478743616" className="text-left text-custom-text2 no-underline">(+94) 787 436 16</a>
              </td>
            </tr>
            <tr>
              <td className="w-[10%] p-5">
                <i className="fa-solid fa-cake-candles text-custom-heading"></i>
              </td>
              <td className="w-[90%]">
                <p className="text-left text-custom-heading m-0 p-0">Birthday</p>
                <a href="https://shalitha.me/about/" className="text-left text-custom-text2 no-underline">21 October 2002</a>
              </td>
            </tr>
            <tr>
              <td className="w-[10%] p-5">
                <i className="fa-solid fa-building-columns text-custom-heading"></i>
              </td>
              <td className="w-[90%]">
                <p className="text-left text-custom-heading m-0 p-0">Education</p>
                <a href="https://tech.rjt.ac.lk" className="text-left text-custom-text2 no-underline">Rajarata University OF Sri Lanka</a>
              </td>
            </tr>
            <tr>
              <td className="w-[10%] p-5">
                <i className="fa-solid fa-location-crosshairs text-custom-heading"></i>
              </td>
              <td className="w-[90%]">
                <p className="text-left text-custom-heading m-0 p-0">Location</p>
                <a href="https://shalitha.me/about/" className="text-left text-custom-text2 no-underline">Gampaha District, Western Province, Sri Lanka</a>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        {/* Social Media Icons */}
        <div className="social_listJS"></div>
      </div>
    </div>
  )
}
