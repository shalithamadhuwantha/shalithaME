'use client'

export default function Header() {

  return (
    <div className="w-auto flex flex-col justify-center text-center font-playfair mt-4 px-2 sm:px-4 md:px-8">
      {/* Header Image */}
      <img className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] border-2 border-custom-text p-2.5 rounded-full self-center" src="/assets/img/shalitha.webp" alt="my logo" />

      {/* Header Titles */}
      <h1 className="mt-0 mb-0 text-custom-text text-2xl sm:text-4xl">Shalitha Madhuwantha</h1>
      <h2 className="mt-0 mb-0 text-custom-text2 text-xl sm:text-4xl">
        I'M <span id="target" className="text-custom-text text-lg sm:text-2xl"></span>
      </h2>

      {/* Social Media Icons */}
      <div className="social_listJS flex flex-row  justify-center gap-2 mt-2 overflow-x-auto scrollbar-thin scrollbar-thumb-[#343434] max-w-full" />

      {/* Navigation */}
      <div className="nav w-full overflow-x-auto scrollbar-thin scrollbar-thumb-[#343434]">
        <ul className="list-none flex flex-row nav-raw  flex-nowrap justify-center mt-2.5 mb-0 pl-0 gap-2 sm:gap-5 min-w-max">
          <li>
            <a href="/" className="mx-2 sm:mx-5 text-xs sm:text-base text-custom-text2 font-space-mono no-underline">
              <i className="fa-solid fa-house text-custom-heading"></i> 127.0.0.1
            </a>
          </li>
          <li>
            <a href="/projects" className="mx-2 sm:mx-5 text-xs sm:text-base text-custom-text2 font-space-mono no-underline">
              <i className="fa-solid fa-code text-custom-heading"></i> I DID
            </a>
          </li>
          <li>
            <a href="/#skills" className="mx-2 sm:mx-5 text-xs sm:text-base text-custom-text2 font-space-mono no-underline">
              <i className="fa-solid fa-terminal text-custom-heading"></i> power
            </a>
          </li>
          <li>
            <a href="/about" className="mx-2 sm:mx-5 text-xs sm:text-base text-custom-text2 font-space-mono no-underline">
              <i className="fa-solid fa-fingerprint text-custom-heading"></i> Who Am I
            </a>
          </li>
        </ul>
      </div>

      {/* Header Line */}
      <hr className="w-full border border-[#343434] mt-2" />
    </div>
  )
}
