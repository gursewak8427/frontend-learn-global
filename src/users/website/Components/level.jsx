import React from "react";
import Lv1 from "../images/lv1.png";
import Lv2 from "../images/lv2.png";
import Lv3 from "../images/lv3.png";

export default function level() {
  return (
    <div className="levels py-20 px-4 lg:px-0">
      <div className="container mx-auto">
        <h4 className="relative text-center text-6xl relative">
          <span>Apply For</span> The Following Grade Levels
        </h4>
        <div className="lg:flex inner-levels gap-10">
          <div className="p-4 shadow-xl">
            <img className="mx-auto block" src={Lv1} alt="" />
            <h5 className="text-2xl text-center my-3">High School</h5>
            <p className="text-center text-sm">
              High School is a very crucial time for every child. It is said to
              crucial period as it's the last four years before entering the
              college life or workforce. It's the time when kids become young
              adult they make loyal friends, learn to meet new people.
              LearnGlobal helps your kids studying overseas. LearnGlobal is
              providing a golden chance of learning in best High school that too
              from best teachers. Apply now and secure your child's feature.
            </p>
          </div>

          <div className="p-4 shadow-xl">
            <img className="mx-auto block" src={Lv2} alt="" />
            <h5 className="text-2xl text-center my-3">Undergraduate</h5>
            <p className="text-center text-sm">
              Undergraduate students know very well what is best for their
              feature. Undergraduate students enhance their development and
              learning process. They focus on their career building. This is the
              best time when you can apply for an overseas education visa. They
              get a chance to explore their life experience and gaining
              knowledge from their friend's circle. LearnGlobal helps your child
              to show the best path of feature building. Visit us now to know
              more about the best visa.
            </p>
          </div>

          <div className="p-4 shadow-xl">
            <img className="mx-auto block" src={Lv3} alt="" />
            <h5 className="text-2xl text-center my-3">Post Graduate</h5>
            <p className="text-center text-sm">
              While taking admission in Graduation a student is almost fully
              grown up. They need proper guidance which can help them to achieve
              a successful life. LearnGlobal is all about the showing path which
              goes directly to their dream goal. LearnGlobal is helping every
              student through the proper calculation of right age, right place
              and that all cost under your budget. Contact us now to know more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
