import React from "react";
import { motion} from "framer-motion";
import {fadeIn} from "../utils/animationVarience";

const WorkingStep = () => {
  return (
    <div className="relative bg-cover bg-center py-12 bg-working-img">
      <div className="absolute inset-0 bg-heroBg bg-opacity-85"></div>

      <motion.div 
      
      variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          
      
      className="relative container mx-auto px-4 py-20">
        <div className="text-white text-center mb-20">
          <h2 className="text-4xl font-bold font-secondary mb-4">
            How It Works
          </h2>
          <p className="text-lg md:w-1/2 w-full mx-auto">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
            nesciunt fugit soluta expedita? Alias excepturi itaque necessitatibus
            hic tempora facilis.
          </p>
        </div>

        <div className="flex flex-col md:w-4/5 mx-auto md:flex-row gap-8">
          <div className="relative bg-white text-center p-6 flex-1 min-h-[200px] rounded-md shadow-md">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white size-14 rounded-full flex items-center justify-center">
              1
            </div>
            <h3 className="text-lg font-medium mt-8">Fill a Form</h3>
            <p className="my-2">
              Step 1 description goes here. Provide essential details to get
              started with our counseling services.
            </p>
          </div>

          <div className="relative bg-white text-center p-6 flex-1 min-h-[200px] rounded-md shadow-md">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white size-14 rounded-full flex items-center justify-center">
              2
            </div>
            <h3 className="text-lg font-medium mt-8">Get Matched</h3>
            <p className="my-2">
              Step 2 description goes here. Our system connects you with a
              suitable counselor based on your needs.
            </p>
          </div>

          <div className="relative bg-white text-center p-6 flex-1 min-h-[200px] rounded-md shadow-md">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white size-14 rounded-full flex items-center justify-center">
              3
            </div>
            <h3 className="text-lg font-medium mt-8">Schedule</h3>
            <p className="my-2">
              Step 3 description goes here. Choose a convenient time for your
              counseling session and confirm your appointment.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkingStep;
