import React from "react";
//Components
import { Link } from "react-router-dom";
import { InfoCard, AccordianItem } from "#HomeSharedComponents";
import ContactForm from "./ContactForm";
//Images
import phone from "#Images/phone7.gif";
import selfie from "#Images/selfie.png";
import solution from "#Images/solution.png";
import create from "#Images/works/create.svg";
import approve from "#Images/works/approve.svg";
import paid from "#Images/works/paid.svg";
import deadline from "#Images/works/deadline.svg";

const Main = (props) => {
  return (
    <main>
      <div className="container-fluid">
        {/*Banner*/}
        <div className="row d-flex align-items-center landing px-2 px-sm-5">
          <div className="col-12 col-md-5 text-light">
            <h1 className="my-5 my-md-0">Influencer Marketing powered by blockchain</h1>
            <h5 className="text-light my-5">
              Letting brands pay influencers and content creators in real-time for sponsored content and
              embedded advertisements, instead of upfront lump sums paid based on historical content
              engagement numbers.
            </h5>
            <div className="row my-md-5">
              <div className="col-6 col-sm-4">
                <Link to="/contracts">
                  <button className="btn btn-primary">Get Started</button>
                </Link>
              </div>
              <div className="col-6 col-sm-4">
                <a href="#learn">
                  <button className="btn btn-outline-secondary text-white-50">Learn more</button>
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-7 text-center">
            <img className="img-fluid" src={phone} alt="phone" />
          </div>
        </div>
        {/*Problem statement*/}
        <div className="row px-2 px-sm-5 py-5 theme-light" id="learn">
          <div className="col-12 col-sm-4">
            <img className="img-fluid p-5" src={selfie} alt="selfie" />
          </div>
          <div className="col-12 col-sm-8">
            <h1>The Problem</h1>
            <p className="text-body">
              Sponsored content and embedded advertisements are everywhere. Think — tv shows, news articles,
              TikTok videos, Instagram posts, YouTube videos, Spotify podcasts, movies, sports games. They can
              be more valuable than Google AdSense because of the close relationships between the content
              creator and their audience.
              <br />
              <br />
              Today, brands pay content creators and influencers up front lump sums based on their historical
              average viewership numbers.
              <br />
              <br />
              Yet, what if a content creator grows their audience tenfold over the coming years and the
              content that they partnered with a brand for got way more than expected viewership numbers? Or,
              what if the creator’s media was a dud and got way less than expected engagement?
              <br />
              <br />
              In either case, the contract’s upfront lump sum pay didn’t match the value generated for the
              hardcoded embedded advertisements. If only sponsored content contracts could be more dynamic and
              brands could pay influencers or content creators in a smarter way …
            </p>
          </div>
        </div>
        {/*Solution statement*/}
        <div className="row px-2 px-sm-5  py-5">
          <div className="col-12 col-sm-4">
            <h1>Our Solution</h1>
            <p className="text-body">
              Dapplu lets brands make smart contracts with content creators. Only YouTube videos are supported
              at the moment. The smart contracts automatically pay the creator for their YouTube video views.
            </p>
          </div>
          <div className="col-12 col-sm-3 m-auto">
            <img className="img-fluid" src={solution} alt="solution" />
          </div>
        </div>
        {/*Explanation cards*/}
        <div className="row px-2 px-sm-5 py-5 gy-4 theme-light">
          <h1 className="text-center">How it works</h1>
          <InfoCard
            icon={create}
            title="Create"
            description="Brand create a digital contract. They set a deadline, 
                      pay per view amount, budget, and can upload an optional legally binding written agreement."
          />

          <InfoCard
            icon={approve}
            title="Approve"
            description="Content creators approve the contract by uploading their YouTube video tag with the branded content."
          />

          <InfoCard
            icon={paid}
            title="Get Paid"
            description="The smart contracts automatically pay the creator for their YouTube video views. The creator 
                      can't earn more than the contract's budget amount. "
          />

          <InfoCard
            icon={deadline}
            title="Deadline"
            description="When the contract's deadline comes, it stops automatically updating itself and stops 
                      paying the content creator for new video views. If the creator didn’t earn the contract’s 
                      full budget amount, then the brand can with the remaining. "
          />
        </div>
        {/* FAQ accordian*/}
        <div className="row px-2 px-sm-5 py-5 theme-light">
          <h1 className="text-center">FAQ</h1>
          <div className="accordion accordion-flush" id="faq">
            <AccordianItem
              id="faq"
              number="1"
              title="What’s in it for the brand?"
              body="You’ll never worry whether the content creator you hired is making good content. 
                        You’ll be in full control of your advertising spending. If you want to pay $0.03 per 
                        view then you’re guaranteed to pay $0.03 per view. Simple. "
            />

            <AccordianItem
              id="faq"
              number="2"
              title="What’s in it for the content creator?"
              body="You work hard to make your branded content. If it’s valuable today when your audience is small, 
                      then why shouldn’t it be valuable ten years from now when your audience is massive? So, 
                      instead of getting paid a small fixed amount today, you should set up a recurring revenue model 
                      that grows when your audience grows. "
            />

            <AccordianItem
              id="faq"
              number="3"
              title="Why is blockchain technology used?"
              body="The blockchain guarantees trust and decentralization. It lets Dapplu get accurate content 
                      engagement data that hasn’t been tempered with, which then lets Dapplu automatically pay content 
                      creators.  "
            />

            <AccordianItem
              id="faq"
              number="4"
              title="What currencies are used?"
              body="Brands create contracts using ethereum but they can choose to store the contract’s funds in a 
                      number of “stablecoins” (cryptocurrencies pegged to fiat currencies like the U.S. dollar), 
                      including Tether, US Dollar Coin, and DAI. "
            />

            <AccordianItem
              id="faq"
              number="5"
              title="Transaction fees and platform fees"
              body="Creating a contract and withdrawing funds from it costs ethereum gas (roughly $20 at the moment) 
                      and a 1% platform fee of the transacted amount. "
            />

            <AccordianItem
              id="faq"
              number="6"
              title="Overview and demo video"
              body={
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.youtube.com/embed/YsyupdrMm6s?rel=0"
                    title="YouTube video"
                    allowFullScreen
                  ></iframe>
                </div>
              }
            />
          </div>
        </div>
        {/*Contact form*/}
        <div className="row px-2 px-sm-5 py-5 theme-light">
          <div className="col-12 col-md-6 mx-auto">
            <h3 className="text-center my-3">Still have questions? Send us a message!</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
