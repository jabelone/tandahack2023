"use client";

import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  Toast,
  Label,
  TextInput,
  Checkbox,
  Button,
  Modal,
} from "flowbite-react";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import axios from "axios";

export default function Home() {
  const [sentToast, setSentToast] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [yourName, setYourName] = useState("Dwight Schrute");
  const [bossName, setBossName] = useState("Michael Scott");
  const [yourEmail, setYourEmail] = useState("hello@jaimyn.com.au");
  const [bossEmail, setBossEmail] = useState("jaimyn.mayer@gmail.com");

  const resetForm = useCallback(() => {
    setYourName("Dwight Schrute");
    setBossName("Michael Scott");
    setYourEmail("hello@jaimyn.com.au");
    setBossEmail("jaimyn.mayer@gmail.com");
  }, []);

  useEffect(() => {
    setTimeout(setSentToast, 5000, false);
  }, [sentToast]);

  return (
    <main className="flex font min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-orange-500 to-purple-500">
      <h1 className="text-4xl text-white font-righteous">SickyPro</h1>

      <div className="relative flex place-items-center after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert hover:scale-105 transition duration-500 ease-in-out"
          src="/logo_small.png"
          alt="sicky.pro Logo"
          width={200}
          height={200}
          priority
          onClick={() => {
            setDetailsModal(true);
          }}
        />
        <div className="font-caveat relative flex flex-col">
          <Icon
            icon="ph:arrow-arc-left-light"
            className="rotate-12"
            width={45}
          />
          <div className="text-center ml-6">
            Tap <br />
            Here!
          </div>
        </div>
      </div>

      <Modal show={detailsModal}>
        <Modal.Header>First we need some details</Modal.Header>
        <Modal.Body>
          <div>
            <p className="mb-4">
              Before you can start faking sick days like a pro, we need some
              deets from you. Don&#8217;t worry, we won&#8217;t tell your boss
              (if you keep paying for a subscription 😜).
            </p>

            <div className="mb-2 block">
              <Label htmlFor="yourName" value="Your Name" />
            </div>
            <TextInput
              id="yourName"
              key="yourName"
              type="text"
              placeholder="Dwight Schrute"
              required={true}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                setYourName(e.target.value);
              }}
              disabled={loading}
            />

            <br />

            <div className="mb-2 block">
              <Label htmlFor="bossName" value="Boss' Name" />
            </div>
            <TextInput
              id="bossName"
              type="text"
              placeholder="Michael Scott"
              required={true}
              onBlur={(e) => {
                setBossName(e.target.value);
              }}
              disabled={loading}
            />

            <br />

            <div className="mb-2 block">
              <Label htmlFor="yourEmail" value="Your Email" />
            </div>
            <TextInput
              id="yourEmail"
              key="yourEmail"
              type="email"
              placeholder="imtotallysick@hotmail.net"
              required={true}
              onBlur={(e) => {
                setYourEmail(e.target.value);
              }}
              disabled={loading}
            />

            <br />

            <div className="mb-2 block">
              <Label htmlFor="bossEmail" value="Your Boss' Email" />
            </div>
            <TextInput
              id="bossEmail"
              key="bossEmail"
              type="email"
              placeholder="bigshotmanager@gmail.com"
              required={true}
              onBlur={(e) => {
                setBossEmail(e.target.value);
              }}
              disabled={loading}
            />
          </div>

          <br />

          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              onChange={(e) => {
                setAgreed(!agreed);
              }}
              disabled={loading}
            />
            <Label htmlFor="remember">
              I agree that there is no privacy policy and my personal info may
              be sold on the dark web.
            </Label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="ml-auto flex flex-row space-x-2">
            {loading && <ClipLoader color="#36d7b7" />}
            <Button
              disabled={!agreed}
              onClick={() => {
                setLoading(true);
                axios
                  .post("/api/cough-cough", {
                    to: bossEmail,
                    from: yourEmail,
                    toName: bossName,
                    fromName: yourName,
                  })
                  .then(function (response) {
                    setDetailsModal(false);
                    setSentToast(true);
                    setLoading(false);
                    resetForm();
                  })
                  .catch(function (error) {
                    alert(error);
                    setLoading(false);
                  });
              }}
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {sentToast && (
        <div className="space-x-4 divide-x divide-gray-200 dark:divide-gray-700">
          <Toast>
            <Icon icon="ic:twotone-send" width={24} />
            <div className="pl-4 text-sm font-normal">
              Message sent! Go back to sleep 😴.
            </div>
          </Toast>
        </div>
      )}

      <div className="text-center text-white w-full font-mono">
        By{" "}
        <a className="underline" href="https://jaimyn.dev">
          jaimyn.dev
        </a>
      </div>
    </main>
  );
}
