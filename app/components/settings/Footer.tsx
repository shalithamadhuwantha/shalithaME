export default function Footer() {
  const second = "Hello World";
  return (
    <>
           {/* Footer */}
        <div className="w-full text-center mt-10 mb-5">
          <hr className="border-[0.2px] border-custom-text2" />
          <p>
            Copyright © 2025 💛{" "}
            <a
              href="https://shalitha.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-custom-heading"
              >
              Shalitha Madhuwantha
            </a>
          </p>
        </div>
                </>
  );
};
