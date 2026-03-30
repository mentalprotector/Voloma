type BPlanterVisualProps = {
  shape?: 'rect' | 'square' | 'slim';
  tone?: 'natural' | 'warm' | 'dark';
  ghost?: boolean;
  foliage?: boolean;
  className?: string;
};

const shapeClasses = {
  rect: 'aspect-[2.25/1]',
  square: 'aspect-square',
  slim: 'aspect-[0.72/1]',
};

const toneClasses = {
  natural: {
    body: 'bg-[linear-gradient(180deg,#d7b592_0%,#b98159_55%,#916244_100%)]',
    face:
      'bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(255,255,255,0)_38%,rgba(91,59,37,0.16)_100%)]',
    side: 'bg-[linear-gradient(180deg,#9b6d4c_0%,#714d35_100%)]',
    rim: 'bg-[linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0.04))]',
  },
  warm: {
    body: 'bg-[linear-gradient(180deg,#c99874_0%,#a66d49_56%,#7d5438_100%)]',
    face:
      'bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0)_34%,rgba(73,47,31,0.18)_100%)]',
    side: 'bg-[linear-gradient(180deg,#88583a_0%,#5f3f2c_100%)]',
    rim: 'bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))]',
  },
  dark: {
    body: 'bg-[linear-gradient(180deg,#86614c_0%,#5f4537_55%,#423026_100%)]',
    face:
      'bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0)_36%,rgba(0,0,0,0.18)_100%)]',
    side: 'bg-[linear-gradient(180deg,#5b4133_0%,#39291f_100%)]',
    rim: 'bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))]',
  },
};

const BPlanterVisual = ({
  shape = 'rect',
  tone = 'natural',
  ghost = false,
  foliage = false,
  className = '',
}: BPlanterVisualProps) => {
  const palette = toneClasses[tone];

  if (ghost) {
    return (
      <div className={`relative isolate ${shapeClasses[shape]} ${className}`}>
        <div className="absolute inset-x-[10%] bottom-[-10%] h-[18%] rounded-full bg-[#66503d]/8 blur-2xl" />
        <div className="absolute inset-0 rounded-[32px] bg-white/44 ring-1 ring-black/6">
          <div className="absolute inset-[7%] rounded-[28px] border border-dashed border-black/8" />
          <div className="absolute inset-x-[10%] top-[9%] h-[12%] rounded-[20px] bg-black/[0.03]" />
          <div className="absolute inset-y-[10%] right-0 w-[10%] rounded-r-[30px] bg-black/[0.04]" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative isolate ${shapeClasses[shape]} ${className}`}>
      <div className="absolute inset-x-[10%] bottom-[-10%] h-[18%] rounded-full bg-[#6f4f39]/14 blur-[28px]" />

      {foliage ? (
        <div className="absolute inset-x-[9%] top-[-16%] h-[52%]">
          <div className="absolute left-[6%] top-[20%] h-[52%] w-[18%] rotate-[-18deg] rounded-full bg-[linear-gradient(180deg,#7ca06c_0%,#4f6f50_100%)]" />
          <div className="absolute left-[20%] top-[4%] h-[60%] w-[20%] rotate-[4deg] rounded-full bg-[linear-gradient(180deg,#95b27e_0%,#587450_100%)]" />
          <div className="absolute left-[34%] top-[12%] h-[56%] w-[18%] rotate-[-8deg] rounded-full bg-[linear-gradient(180deg,#86aa72_0%,#4e6f4d_100%)]" />
          <div className="absolute right-[24%] top-[2%] h-[60%] w-[20%] rotate-[10deg] rounded-full bg-[linear-gradient(180deg,#9bbc85_0%,#607852_100%)]" />
          <div className="absolute right-[7%] top-[18%] h-[50%] w-[18%] rotate-[20deg] rounded-full bg-[linear-gradient(180deg,#7c9f6c_0%,#4e6e4f_100%)]" />
        </div>
      ) : null}

      <div className={`absolute inset-0 rounded-[34px] ${palette.body} shadow-[0_42px_80px_rgba(74,49,30,0.18),inset_0_1px_0_rgba(255,255,255,0.34)]`} />
      <div className={`absolute inset-[1.8%] rounded-[32px] ${palette.face}`} />
      <div className={`absolute inset-x-[5%] top-[9%] h-[11%] rounded-[20px] ${palette.rim}`} />
      <div className={`absolute inset-y-[8%] right-0 w-[8%] rounded-r-[30px] ${palette.side} shadow-[inset_1px_0_0_rgba(255,255,255,0.16)]`} />
      <div className="absolute left-[9%] top-[18%] h-[48%] w-[26%] rounded-[24px] bg-[linear-gradient(90deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02))] blur-[1px]" />
      <div className="absolute right-[12%] top-[20%] h-[24%] w-[18%] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.18),rgba(255,255,255,0)_72%)]" />
    </div>
  );
};

export default BPlanterVisual;
