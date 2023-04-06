import React from "react";

export default function Schoolform() {
  return (
    <div className="schoolform-part lg:mb-20 px-4 py-20 bg-[#f5f5f5]">
      <div className="container mx-auto">
        <div className="">
          <div className="inner-form-part">
            <h2 className="text-xl mb-4 font-bold">
              Find and apply to program at our University
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>

            <div className="formline flex gap-4 mt-4 justify-center">
              <div className="flex gap-4">
                <button className="p-2 border rounded">Undergraduate</button>
                <button className="p-2 border rounded">Postgraduate</button>
              </div>

              <div className="">
                <input
                  className="py-3 px-2 border rounded"
                  type="text"
                  placeholder="Enter a Subject"
                />
              </div>

              <div className="">
                <button className="p-3 rounded bg-[#059669] hover:bg-[#000] text-white">
                  Find your program matches
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
