import React from "react";
import Lv1 from "../../website/images/lv1.png";

export default function Admitted() {
  return (
    <div className="admitted px-4 pt-20">
      <div className="container mx-auto">
        <h4 className="text-center font-bold text-2xl mb-20">
          How we maximize your chance of getting admitted
        </h4>

        <div className="lg:flex relative gap-4 chance-row">
          <div className="bg-white">
            <span className="img-part-bg relative">
              <img className="mx-auto d-block w-32 bg-white" src={Lv1} />
            </span>
            <h5 className="text-center font-bold font-bold text-xl my-2">
              Lorum Ipsum
            </h5>
            <p className="text-center">
              Learn Global nde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium
            </p>
          </div>

          <div className="bg-white">
            <span className="img-part-bg relative">
              <img className="mx-auto d-block w-32 bg-white" src={Lv1} />
            </span>
            <h5 className="text-center font-bold font-bold text-xl my-2">
              Lorum Ipsum
            </h5>
            <p className="text-center">
              Learn Global nde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium
            </p>
          </div>

          <div className="bg-white">
            <span className="img-part-bg relative">
              <img className="mx-auto d-block w-32 bg-white" src={Lv1} />
            </span>
            <h5 className="text-center font-bold font-bold text-xl my-2">
              Lorum Ipsum
            </h5>
            <p className="text-center">
              Learn Global nde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium
            </p>
          </div>

          <div className="bg-white">
            <span className="img-part-bg relative">
              <img className="mx-auto d-block w-32 bg-white" src={Lv1} />
            </span>
            <h5 className="text-center font-bold font-bold text-xl my-2">
              Lorum Ipsum
            </h5>
            <p className="text-center">
              Learn Global nde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium
            </p>
          </div>
        </div>
        <p className="text-center text-xl mt-10">
          <b>Our services are free from students</b> like you because we are
          funded by universities.
        </p>
      </div>
    </div>
  );
}
