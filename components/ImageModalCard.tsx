"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Loader from "./ui/Loader";

interface ImageCardProps {
  question: string;
  ans: string;
  answer: string;
}

const ImageModalCard: React.FC<ImageCardProps> = ({
  question,
  ans,
  answer,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoralLoading, setIsMoralLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Card>
        <CardHeader className="p-3 md:p-6">
          <CardTitle>{question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1 flex justify-center items-center">
            {isLoading && (
              <div className="flex flex-col justify-center items-center w-full min-h-[300px] fixed">
                <Loader />
              </div>
            )}
            <Image
              src={ans}
              width={500}
              height={500}
              alt={answer}
              className={`cursor-pointer hover:opacity-90 transition-opacity`}
              onClick={openModal}
              onLoad={() => setIsLoading(false)}
              placeholder="empty"
            />
          </div>
        </CardContent>
      </Card>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="w-[90vw] h-[90vh] relative">
            {isMoralLoading && (
              <div className="flex flex-col justify-center items-center w-full h-full fixed">
                <Loader />
              </div>
            )}
            <Image
              src={ans}
              fill={true}
              alt={answer}
              className="object-contain"
              onLoad={() => setIsMoralLoading(false)}
              placeholder="empty"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModalCard;
