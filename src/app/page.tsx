"use client";

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
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export default function Home() {
  const [sentToast, setSentToast] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [agreed, setAgreed] = useState(false);

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
          <form className="flex flex-col gap-4">
            <div>
              <p className="mb-4">
                Before you can start faking sick days like a pro, we need some
                deets from you. Don&#8217;t worry, we won&#8217;t tell your boss
                (if you keep payinf for a subscription 😜).
              </p>

              <div className="mb-2 block">
                <Label htmlFor="yourName" value="Your Name" />
              </div>
              <TextInput
                id="yourName"
                type="text"
                placeholder="Dwight Schrute"
                required={true}
              />

              <br />

              <div className="mb-2 block">
                <Label htmlFor="yourEmail" value="Your Email" />
              </div>
              <TextInput
                id="yourEmail"
                type="email"
                placeholder="imtotallysick@hotmail.net"
                required={true}
              />

              <br />

              <div className="mb-2 block">
                <Label htmlFor="bossEmail" value="Your Boss' Email" />
              </div>
              <TextInput
                id="yourEmail"
                type="email"
                placeholder="bigshotmanager@gmail.com"
                required={true}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                onChange={() => {
                  setAgreed(!agreed);
                }}
              />
              <Label htmlFor="remember">
                I agree that there is no privacy policy and my personal info may
                be sold on the dark web.
              </Label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="ml-auto"
            disabled={!agreed}
            onClick={() => {
              axios
                .post("/api/cough-cough", {
                  to: "jaimyn.mayer@gmail.com",
                  from: "hello@jaimyn.com.au",
                  toName: "Bri",
                  fromName: "Jaimyn Mayer",
                })
                .then(function (response) {
                  setDetailsModal(false);
                  setSentToast(true);
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >
            Save
          </Button>
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
