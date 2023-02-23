import React from "react";

export default function CustomerReview() {
  let customerdata = [
    {
      customername: "John Doe",
      customerdesignation: "CEO of XYZ Company",
      customerimage: "",
      review:
        "Our open rates increased by 20% since we started using this platform.",
    },
    {
      customername: "Jane Smith",
      customerdesignation: "Marketing Director of ABC Company",
      customerimage: "",
      review:
        "The targeting feature has helped us reach the right audience at the right time.",
    },
  ];
  return (
    <div className="block w-full md:w-2/3 mx-auto my-5  px-3">
      <span className="block text-start md:text-center text-3xl mb-4">
        What our customers are saying
      </span>
      <div>
        {customerdata.map((customer, index) => {
          return (
            <div className=" text-start md:text-center block my-4" key={index}>
              <img src={customer.customerimage} />
              <span className="block text-xl">"{customer.review}"</span>
              <span className="block text text-gray-500">
                {customer.customername} - {customer.customerdesignation}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
