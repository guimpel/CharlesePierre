import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Plataformas from '@/components/Plataformas';
import Agenda from '@/components/Agenda';
import Sobre from '@/components/Sobre';
import Discografia from '@/components/Discografia';
import Videos from '@/components/Videos';
import Contato from '@/components/Contato';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Plataformas />
      <Agenda />
      <Sobre />
      <Discografia />
      <Videos />
      <Contato />
    </div>
  );
};

export default Index;
