import React from "react";

export default function FAQ() {
  let qas = [
    {
      question: "What is a push notification?",
      answer:
        "A push notification is a message that pops up on a mobile device. App publishers can send them at any time; users don't have to be in the app or using their devices to receive them.",
    },
    {
      question: "Is there a limit to the number of notifications I can send?",
      answer:
        "Yes, each pricing plan has a limit on the number of notifications that can be sent per month. However, you can always upgrade to a higher plan if you need to send more notifications.",
    },
    {
      question: "Can I try the platform for free?",
      answer:
        "Yes, we offer a free plan that allows you to send up to 100 notifications per month. You can upgrade to a paid plan at any time.",
    },
  ];
  return (
    <div className=" mx-auto container-sm my-3 ">
      <span className="mb-5    block  text-center  text-xl sm:text-2xl md:text-3xl">
        Frequently asked questions
      </span>
      <div className="">
        {qas.map((qa, index) => {
          return (
            <div className="block my-5" key={index}>
              <span className="block text-xl md:text-2xl font-semibold my-2">
                {qa.question}
              </span>
              <span className="block text-lg md:text-xl text-gray-500">
                {qa.answer}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
