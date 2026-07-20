import AnimatedSection from "@/components/AnimatedSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Navbar from "@/components/Navbar";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const ContactPage = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });

  return (
    <div>
      <Navbar />
      <div className="mb-12.5" />
      <AnimatedSection>
        <div className="relative flex justify-center bg-dark-red h-[494px] p-6 lg:p-0">
          <div className="hidden xl:block absolute bottom-0 lg:left-37.75 w-33.25 h-106.25">
            <Image src="/Vector (1).png" fill sizes="133px" alt=""></Image>
          </div>
          <Form width="483px"></Form>
        </div>
      </AnimatedSection>
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
