const EPOCH = new Date(2026,3,20); // April 20 2026 = Day 1
const verbs = [["します","します","! To do","irr"],["あります","あります","! There is (inanimate)","u"],["います","います","! There is (animate)","ru"],["行きます","いきます","! To go","u"],["来ます","きます","! To come","irr"],["見ます","みます","! To see / look","ru"],["食べます","たべます","! To eat","ru"],["飲みます","のみます","! To drink","u"],["話します","はなします","! To speak / talk","u"],["聞きます","ききます","! To listen / ask","u"],["書きます","かきます","! To write","u"],["読みます","よみます","! To read","u"],["買います","かいます","! To buy","u"],["帰ります","かえります","! To return home","u"],["起きます","おきます","! To wake up","ru"],["寝ます","ねます","! To sleep","ru"],["わかります","わかります","! To understand","u"],["使います","つかいます","! To use","u"],["思います","おもいます","! To think / feel","u"],["言います","いいます","! To say","u"],["知ります","しります","! To know","u"],["できます","できます","! Can do / Be completed","ru"],["見えます","みえます","! To be visible / can see","ru"],["聞こえます","きこえます","! To be audible / can hear","ru"],["作ります","つくります","! To make / create","u"],["取ります","とります","! To take","u"],["乗ります","のります","! To ride / board","u"],["降ります","おります","! To get off / descend","u"],["歩きます","あるきます","! To walk","u"],["走ります","はしります","! To run","u"],["入ります","はいります","! To enter","u"],["出ます","でます","! To leave / go out","ru"],["会います","あいます","! To meet","u"],["待ちます","まちます","! To wait","u"],["始めます","はじめます","! To begin / start","ru"],["終わります","おわります","! To end / finish","u"],["休みます","やすみます","! To rest / take a break","u"],["働きます","はたらきます","! To work","u"],["教えます","おしえます","! To teach / tell","ru"],["習います","ならいます","! To learn (from someone)","u"],["勉強します","べんきょうします","! To study","irr"],["練習します","れんしゅうします","! To practice","irr"],["開けます","あけます","! To open","ru"],["閉めます","しめます","! To close / shut","ru"],["つけます","つけます","! To turn on","ru"],["消します","けします","! To turn off / erase","u"],["送ります","おくります","! To send / see off","u"],["電話します","でんわします","! To call (phone)","irr"],["呼びます","よびます","! To call / invite","u"],["貸します","かします","! To lend","u"],["借ります","かります","! To borrow","ru"],["あげます","あげます","! To give (to others)","ru"],["もらいます","もらいます","! To receive","u"],["くれます","くれます","! To give (to me)","ru"],["売ります","うります","! To sell","u"],["手伝います","てつだいます","! To help / assist","u"],["払います","はらいます","! To pay","u"],["座ります","すわります","! To sit","u"],["立ちます","たちます","! To stand","u"],["着ます","きます","! To wear (clothes)","ru"],["脱ぎます","ぬぎます","! To take off (clothes)","u"],["履きます","はきます","To wear (shoes/pants)","u"],["着替えます","きがえます","To change clothes","ru"],["磨きます","みがきます","To brush / scrub","u"],["浴びます","あびます","To shower","ru"],["洗います","あらいます","! To wash","u"],["掃除します","そうじします","! To clean / tidy","irr"],["料理します","りょうりします","! To cook","irr"],["洗濯します","せんたくします","To do laundry","irr"],["切ります","きります","! To cut","u"],["泊まります","とまります","To stay overnight","u"],["旅行します","りょこうします","! To travel","irr"],["遊びます","あそびます","To play / hang out","u"],["泳ぎます","およぎます","! To swim","u"],["登ります","のぼります","To climb / go up","u"],["見せます","みせます","To show","ru"],["届けます","とどけます","To deliver","ru"],["探します","さがします","! To search","u"],["見つけます","みつけます","! To find","ru"],["見つかります","みつかります","! To be found","u"],["出かけます","でかけます","! To go out","ru"],["出します","だします","To take out","u"],["入れます","いれます","To put in","ru"],["集めます","あつめます","! To collect / gather","ru"],["集まります","あつまります","! To gather","u"],["並びます","ならびます","To line up","u"],["並べます","ならべます","To arrange in a line","ru"],["上がります","あがります","! To rise / increase","u"],["下がります","さがります","! To fall / decrease","u"],["下げます","さげます","To lower","ru"],["変わります","かわります","! To change (intrans.)","u"],["変えます","かえます","! To change (trans.)","ru"],["始まります","はじまります","To begin (intrans.)","u"],["続きます","つづきます","To continue (intrans.)","u"],["続けます","つづけます","! To continue","ru"],["止めます","とめます","To stop (trans.)","ru"],["通ります","とおります","! To pass through","u"],["考えます","かんがえます","! To think / consider","ru"],["答えます","こたえます","To answer / respond","ru"],["決めます","きめます","! To decide","ru"],["決まります","きまります","! To be decided","u"],["確認します","かくにんします","! To confirm / check","irr"],["説明します","せつめいします","! To explain","irr"],["紹介します","しょうかいします","! To introduce","irr"],["質問します","しつもんします","To ask a question","irr"],["相談します","そうだんします","! To consult / discuss","irr"],["頼みます","たのみます","! To ask / order","u"],["断ります","ことわります","! To refuse / decline","u"],["忘れます","わすれます","! To forget","ru"],["覚えます","おぼえます","! To memorize / remember","ru"],["調べます","しらべます","! To investigate / look up","ru"],["比べます","くらべます","! To compare","ru"],["気づきます","きづきます","To notice / realize","u"],["思い付きます","おもいつきます","To come to mind","u"],["話し合います","はなしあいます","To discuss / talk over","u"],["誘います","さそいます","! To invite / ask out","u"],["頑張ります","がんばります","To do one's best","u"],["信じます","しんじます","To believe / trust","ru"],["諦めます","あきらめます","To give up","ru"],["慣れます","なれます","! To get used to","ru"],["迷います","まよいます","To be lost / hesitate","u"],["悩みます","なやみます","To worry / agonize","u"],["楽しみます","たのしみます","To enjoy","u"],["喜びます","よろこびます","! To rejoice","u"],["悲しみます","かなしみます","! To grieve","u"],["心配します","しんぱいします","! To worry (about someone)","irr"],["安心します","あんしんします","To feel relieved","irr"],["緊張します","きんちょうします","To be nervous / tense","irr"],["感動します","かんどうします","To be moved / impressed","irr"],["成功します","せいこうします","! To succeed","irr"],["失敗します","しっぱいします","! To fail","irr"],["努力します","どりょくします","To do one's best","irr"],["成長します","せいちょうします","To grow / develop","irr"],["怒ります","おこります","! To get angry","u"],["困ります","こまります","! To be troubled / in trouble","u"],["驚きます","おどろきます","! To be surprised","u"],["泣きます","なきます","! To cry","u"],["笑います","わらいます","! To laugh / smile","u"],["謝ります","あやまります","! To apologize","u"],["落ち着きます","おちつきます","To calm down","u"],["びっくりします","びっくりします","To be startled","irr"],["がっかりします","がっかりします","To be disappointed","irr"],["わくわくします","わくわくします","To be excited / enthusiastic","irr"],["どきどきします","どきどきします","Heart pounding / nervous","irr"],["いらいらします","いらいらします","To be irritated","irr"],["予約します","よやくします","! To reserve / book","irr"],["連絡します","れんらくします","! To contact","irr"],["返事します","へんじします","To reply / respond","irr"],["用意します","ようします","To prepare","irr"],["準備します","じゅんびします","! To prepare oneself","irr"],["参加します","さんかします","! To participate","irr"],["出席します","しゅっせきします","To attend","irr"],["欠席します","けっせきします","To be absent","irr"],["卒業します","そつぎょうします","! To graduate","irr"],["入学します","にゅうがくします","To enter school","irr"],["出発します","しゅっぱつします","! To depart","irr"],["到着します","とうちゃくします","! To arrive","irr"],["見学します","けんがくします","To observe / visit for learning","irr"],["発表します","はっぴょうします","To announce / present","irr"],["提出します","ていしゅつします","To submit / hand in","irr"],["報告します","ほうこくします","To report","irr"],["注意します","ちゅういします","! To warn / be careful","irr"],["挑戦します","ちょうせんします","To challenge / try","irr"],["集中します","しゅうちゅうします","To concentrate","irr"],["招待します","しょうたいします","To invite","irr"],["反省します","はんせいします","To reflect / regret","irr"],["入院します","にゅういんします","To be hospitalized","irr"],["退院します","たいいんします","To be discharged from hospital","irr"],["結婚します","けっこんします","! To get married","irr"],["引っ越します","ひっこします","! To move (house)","u"],["渡ります","わたります","! To cross","u"],["曲がります","まがります","! To turn","u"],["急ぎます","いそぎます","! To hurry / rush","u"],["動きます","うごきます","To move (intrans.)","u"],["回ります","まわります","To rotate / spin","u"],["落ちます","おちます","! To fall","ru"],["落とします","おとします","! To drop","u"],["押します","おします","! To push / press","u"],["引きます","ひきます","! To pull / play (instrument)","u"],["持ちます","もちます","! To hold / carry","u"],["触ります","さわります","To touch","u"],["吸います","すいます","To inhale / smoke","u"],["飛びます","とびます","To fly / jump","u"],["転びます","ころびます","To trip / fall","u"],["滑ります","すべります","To slip","u"],["踏みます","ふみます","To step on","u"],["振ります","ふります","To wave / shake","u"],["戻ります","もどります","! To return","u"],["戻します","もどします","To return (something)","u"],["寄ります","よります","To stop by / approach","u"],["通じます","つうじます","To be connected / understood","ru"],["流れます","ながれます","To flow","ru"],["流します","ながします","To let flow","u"],["転がります","ころがります","To roll","u"],["持ち込みます","もちこみます","To bring in","u"],["受け取ります","うけとります","! To receive / accept","u"],["引き返します","ひきかえします","To turn back","u"],["乗り換えます","のりかえます","To transfer (transport)","ru"],["取り組みます","とりくみます","To tackle / deal with","u"],["引き受けます","ひきうけます","To take responsibility","ru"],["仕上げます","しあげます","To complete / finish up","ru"],["受け入れます","うけいれます","To accept / approve","ru"],["読み返します","よみかえします","To reread","u"],["書き込みます","かきこみます","To fill in / write in","u"],["死にます","しにます","To die","u"],["生まれます","うまれます","! To be born","ru"],["住みます","すみます","! To live / reside","u"],["暮らします","くらします","To live / get by","u"],["過ごします","すごします","To spend time","u"],["太ります","ふとります","! To gain weight","u"],["痩せます","やせます","! To lose weight","ru"],["疲れます","つかれます","! To get tired","ru"],["痛みます","いたみます","To hurt / ache","u"],["直ります","なおります","To recover / be fixed","u"],["直します","なおします","! To fix / repair","u"],["眠ります","ねむります","To fall asleep / sleep","u"],["晴れます","はれます","To clear up (weather)","ru"],["曇ります","くもります","To become cloudy","u"],["吹きます","ふきます","To blow","u"],["光ります","ひかります","To shine / glow","u"],["鳴ります","なります","Makes a sound / Rings","u"],["足ります","たります","Enough / Sufficient","u"],["過ぎます","すぎます","Melewati / Berlebihan","ru"],["起こります","おこります","! Terjadi / Berlangsung","u"],["壊れます","こわれます","! Rusak / Hancur","ru"],["燃えます","もえます","Terbakar / Membara","ru"],["消えます","きえます","! Disappears / Goes out (light)","ru"],["溶けます","とけます","Meleleh / Larut","ru"],["届きます","とどきます","! Sampai / Tiba (kiriman)","u"],["増えます","ふえます","! Increase / Rise","ru"],["増やします","ふやします","Menambah / Meningkatkan","u"],["減ります","へります","! To decrease / decline","u"],["減らします","へらします","To reduce","u"],["冷えます","ひえます","To become cold","ru"],["乾きます","かわきます","To dry","u"],["濡れます","ぬれます","To get wet","ru"],["汚します","よごします","To make dirty","u"],["汚れます","よごれます","To get dirty","ru"],["残ります","のこります","To remain / be left","u"],["残します","のこします","To leave behind","u"],["外れます","はずれます","To miss / come off","ru"],["焼きます","やきます","To grill / fry","u"],["冷やします","ひやします","To cool down","u"],["温めます","あたためます","To warm up","ru"],["混ぜます","まぜます","To mix","ru"],["まぜます","まぜます","To mix (casual)","ru"],["割ります","わります","To break / divide","u"],["包みます","つつみます","To wrap","u"],["片付けます","かたづけます","To tidy up","ru"],["捨てます","すてます","! To throw away","ru"],["飾ります","かざります","To decorate","u"],["塗ります","ぬります","To paint / apply","u"],["歌います","うたいます","To sing","u"],["踊ります","おどります","To dance","u"],["弾きます","ひきます","To play (guitar/piano)","u"],["釣ります","つります","To fish","u"],["撮ります","とります","To take a photo","u"],["貼ります","はります","To stick / paste","u"],["勝ちます","かちます","To win","u"],["負けます","まけます","To lose","ru"],["戦います","たたかいます","To fight / battle","u"],["開きます","ひらきます","! To open (wide)","u"],["閉じます","とじます","To close (book/eyes)","ru"],["鍛えます","きたえます","To train / strengthen","ru"],["眺めます","ながめます","To gaze at","ru"],["合わせます","あわせます","To match / adjust","ru"],["空きます","あきます","To become empty / available","u"],["似合います","にあいます","To suit / look good on","u"],["褒めます","ほめます","To praise","ru"],["叱ります","しかります","To scold","u"],["騒ぎます","さわぎます","To make a commotion","u"],["慰めます","なぐさめます","To comfort","ru"],["助けます","たすけます","To help / rescue","ru"],["助かります","たすかります","To be saved / helped","u"],["与えます","あたえます","To give / grant","ru"],["当たります","あたります","To hit / be correct","u"],["当てます","あてます","To guess / apply to","ru"],["現れます","あらわれます","To appear / show up","ru"],["表します","あらわします","To express / show","u"],["祝います","いわいます","To celebrate","u"],["受けます","うけます","! To receive / take (exam)","ru"],["疑います","うたがいます","To doubt / suspect","u"],["写します","うつします","To copy / photograph","u"],["移ります","うつります","To move / shift","u"],["祈ります","いのります","To pray / wish","u"],["植えます","うえます","To plant","ru"],["育てます","そだてます","To raise / nurture","ru"],["育ちます","そだちます","To grow up","u"],["倒れます","たおれます","! To fall / collapse","ru"],["倒します","たおします","! To knock down / topple","u"],["建てます","たてます","To build (a building)","ru"],["頼ります","たよります","To depend on / rely on","u"],["出会います","であいます","To meet (for the first time)","u"],["伝えます","つたえます","To convey / inform","ru"],["連れます","つれます","To bring (a person)","ru"],["向かいます","むかいます","To face / head toward","u"],["迎えます","むかえます","To pick up / welcome","ru"],["別れます","わかれます","To part / separate","ru"],["逃げます","にげます","To run away / escape","ru"],["守ります","まもります","To protect / obey","u"],["認めます","みとめます","To acknowledge / approve","ru"],["防ぎます","ふせぎます","To prevent / protect","u"],["触れます","ふれます","To touch / mention","ru"],["広げます","ひろげます","To expand / spread out","ru"],["望みます","のぞみます","To hope for / desire","u"],["求めます","もとめます","To seek / demand","ru"],["励みます","はげみます","To be motivated / diligent","u"],["参ります","まいります","To go / come (humble)","u"],["申します","もうします","To say (humble)","u"],["申し上げます","もうしあげます","To say (very polite)","ru"],["申し込みます","もうしこみます","To apply / register","u"],["汗をかきます","あせをかきます","To sweat","u"],["眉をひそめます","まゆをひそめます","To frown / furrow brow","ru"],["うなずきます","うなずきます","To nod","u"],["頷きます","うなずきます","To nod","u"],["あくびをします","あくびをします","To yawn","irr"],["くしゃみをします","くしゃみをします","To sneeze","irr"],["咳をします","せきをします","To cough","irr"],["息を吸います","いきをすいます","To inhale","u"],["息を吐きます","いきをはきます","To exhale","u"],["まねします","まねします","To imitate / copy","irr"],["うろうろします","うろうろします","To wander / be confused","irr"],["ぺらぺら話します","ぺらぺらはなします","To speak fluently","u"],["こっそりします","こっそりします","To do secretly / stealthily","irr"],["ちゃんとします","ちゃんとします","To do properly","irr"],["さぼります","さぼります","To skip / slack off","u"],["がまんします","がまんします","To be patient / endure","irr"],["安心させます","あんしんさせます","To reassure (someone)","ru"],["困らせます","こまらせます","To trouble / inconvenience","ru"],["恋します","こいします","To fall in love","irr"],["込みます","こみます","To be crowded","u"],["盗みます","ぬすみます","To steal","u"],["叫びます","さけびます","To shout / scream","u"],["打ちます","うちます","To hit / type","u"],["恨みます","うらみます","To resent / hold a grudge","u"],["追いかけます","おいかけます","To chase","ru"],["起こします","おこします","To wake up / cause","u"],["遅れます","おくれます","! To be late","ru"],["ほっとします","ほっとします","To feel relieved","irr"],["数えます","かぞえます","To count","ru"],["叶います","かないます","To come true / be granted","u"],["甘えます","あまえます","To be spoiled / rely on others","ru"],["慌てます","あわてます","To panic / rush","ru"],["試みます","こころみます","To try / attempt","ru"],["確かめます","たしかめます","To make sure / confirm","ru"],["振り向きます","ふりむきます","To look back / turn around","u"],["苦しみます","くるしみます","To suffer / be in pain","u"],["怠けます","なまけます","To be lazy","ru"],["憧れます","あこがれます","To admire / long for","ru"],["預けます","あずけます","To entrust / leave with someone","ru"],["預かります","あずかります","To be entrusted with","u"],["隠れます","かくれます","To hide (intrans.)","ru"],["隠します","かくします","To hide (trans.)","u"],["割れます","われます","To break / crack","ru"],["失望します","しつぼうします","To be disappointed","irr"],["集合します","しゅうごうします","To gather (formal)","irr"],["掛けます","かけます","To hang / call (phone)","ru"],["立てます","たてます","To set up / make (a plan)","ru"],["押さえます","おさえます","To hold down / suppress","ru"],["運動します","うんどうします","! To exercise","irr"],["散歩します","さんぽします","! To take a walk","irr"],["いります","いります","To need / require","u"],["抱きます","だきます","To hug / embrace","u"],["冷めます","さめます","To cool / lose feeling","ru"],["かぶります","かぶります","To wear (a hat)","u"],["得ます","えます","To get / obtain","ru"],["選びます","えらびます","! To choose / select","u"],["行います","おこないます","To carry out / hold","u"],["教わります","おそわります","To be taught / learn from","u"],["思い出します","おもいだします","! To recall / remember","u"],["稼ぎます","かせぎます","To earn a living","u"],["構います","かまいます","To care / attend to","u"],["噛みます","かみます","To bite / chew","u"],["通います","かよいます","! To commute / go back and forth","u"],["乾かします","かわかします","To dry (trans.)","u"],["感謝します","かんしゃします","! To thank / be grateful","irr"],["気がつきます","きがつきます","! To notice / realize","u"],["気にします","きにします","! To worry about / care","irr"],["嫌います","きらいます","To hate / dislike","u"],["加えます","くわえます","To add","ru"],["繰り返します","くりかえします","To repeat","u"],["経験します","けいけんします","To experience","irr"],["勧めます","すすめます","To recommend / suggest","ru"],["取り替えます","とりかえます","To replace / exchange","ru"],["運びます","はこびます","! To carry / transport","u"],["しゃべります","しゃべります","! To chat / talk (casual)","u"]];
const words = [
  ["そして", "そして", "! And then / After that", "conj", "N5"],
  ["だから", "だから", "! So / Therefore", "conj", "N5"],
  ["それで", "それで", "! Because of that / Then", "conj", "N5"],
  ["ね", "ね", "! Yeah / Right (seeking agreement)", "conj", "N5"],
  ["よ", "よ", "! Hey / You know (assertion)", "conj", "N5"],
  ["でも", "でも", "! But / However", "cont", "N5"],
  ["でも", "でも", "! But / However (formal)", "cont", "N5"],
  ["だけど", "だけど", "! But / However (casual)", "cont", "N5"],
  ["けど", "けど", "! But (casual)", "cont", "N5"],
  ["が", "が", "! But / However (formal)", "cont", "N5"],
  ["それから", "それから", "! After that / And also", "trans", "N5"],
  ["もう", "もう", "! Already / Anymore", "trans", "N5"],
  ["と", "と", "! And / With", "add", "N5"],
  ["や", "や", "! And / Or (in a list)", "add", "N5"],
  ["か", "か", "! Or", "add", "N5"],
  ["また", "また", "! Also / Besides / Furthermore", "add", "N5"],
  ["そのために", "そのために", "! For that reason / Therefore", "conj", "N4"],
  ["そして", "そして", "And / Then (connecting)", "conj", "N4"],
  ["そこで", "そこで", "! Therefore / As a result", "conj", "N4"],
  ["なぜなら", "なぜなら", "! Because / Since", "conj", "N4"],
  ["〜から", "〜から", "! Because ~ / Due to ~", "conj", "N4"],
  ["〜ので", "〜ので", "! Because ~ (formal/polite)", "conj", "N4"],
  ["しかし", "しかし", "! But / However", "cont", "N4"],
  ["でも", "でも", "! However / Nevertheless", "cont", "N4"],
  ["ところが", "ところが", "! But actually / Yet", "cont", "N4"],
  ["一方", "いっぽう", "! On the other side / Meanwhile", "cont", "N4"],
  ["〜ても", "〜ても", "Even though ~ / Although ~", "cont", "N4"],
  ["〜のに", "〜のに", "Even though ~ / Despite ~", "cont", "N4"],
  ["〜けれど", "〜けれど", "Although ~ / But ~", "cont", "N4"],
  ["それでは", "それでは", "! In that case / Well then", "trans", "N4"],
  ["では", "では", "! In that case (formal)", "trans", "N4"],
  ["じゃあ", "じゃあ", "! Then / Well (casual)", "trans", "N4"],
  ["すると", "すると", "! Then / And suddenly", "trans", "N4"],
  ["ところで", "ところで", "! By the way / Incidentally", "trans", "N4"],
  ["その後", "そのご", "! After that / Following that", "trans", "N4"],
  ["まず", "まず", "! First of all / First", "trans", "N4"],
  ["次に", "つぎに", "Next / Following", "trans", "N4"],
  ["最後に", "さいごに", "Lastly / Finally", "trans", "N4"],
  ["それとも", "それとも", "! Or / Either", "add", "N4"],
  ["その上", "そのうえ", "! Besides that / Moreover", "add", "N4"],
  ["また", "また", "! In addition / Furthermore", "add", "N4"],
  ["それに", "それに", "! Also / In addition", "add", "N4"],
  ["あるいは", "あるいは", "! Or / Perhaps also", "add", "N4"],
  ["もしくは", "もしくは", "Or / Otherwise", "add", "N4"],
  ["もし〜ば", "もし〜ば", "If ~ then", "cond", "N4"],
  ["〜たら", "〜たら", "If ~ / When ~ (condition)", "cond", "N4"],
  ["したがって", "したがって", "Therefore / Thus", "conj", "N3"],
  ["そのため", "そのため", "For that / Consequently", "conj", "N3"],
  ["そのせいで", "そのせいで", "Because of that (negative) / Due to that", "conj", "N3"],
  ["〜ために", "〜ために", "Because of ~ / For ~", "conj", "N3"],
  ["〜によって", "〜によって", "Depending on ~ / Because of ~", "conj", "N3"],
  ["〜ことで", "〜ことで", "With ~ / Through ~", "conj", "N3"],
  ["それにもかかわらず", "それにもかかわらず", "Nevertheless / Even so", "cont", "N3"],
  ["ただし", "ただし", "However / With the caveat that", "cont", "N3"],
  ["ただ", "ただ", "Only / But still", "cont", "N3"],
  ["むしろ", "むしろ", "Rather / On the contrary / Better", "cont", "N3"],
  ["逆に", "ぎゃくに", "On the contrary / Instead", "cont", "N3"],
  ["反対に", "はんたいに", "Conversely / On the other side", "cont", "N3"],
  ["一方で", "いっぽうで", "On the other side / Meanwhile", "cont", "N3"],
  ["ところが", "ところが", "Contrary to expectations / Surprisingly", "cont", "N3"],
  ["そうはいっても", "そうはいっても", "Even so / Nevertheless", "cont", "N3"],
  ["それでも", "それでも", "Still / Nevertheless", "cont", "N3"],
  ["とはいえ", "とはいえ", "Even so / Despite that", "cont", "N3"],
  ["〜にもかかわらず", "〜にもかかわらず", "Even though ~ / Regardless of ~", "cont", "N3"],
  ["その結果", "そのけっか", "As a result / Consequently", "trans", "N3"],
  ["要するに", "ようするに", "In short / In essence", "trans", "N3"],
  ["つまり", "つまり", "That is / In other words", "trans", "N3"],
  ["すなわち", "すなわち", "That is / Namely (formal)", "trans", "N3"],
  ["言い換えれば", "いいかえれば", "In other words", "trans", "N3"],
  ["例えば", "たとえば", "For example / For instance", "trans", "N3"],
  ["一般的に", "いっぱんてきに", "Generally / In general", "trans", "N3"],
  ["実は", "じつは", "Actually / In truth", "trans", "N3"],
  ["まるで", "まるで", "As if / Like", "trans", "N3"],
  ["まず〜次に", "まず〜つぎに", "First ~ then ~", "trans", "N3"],
  ["なお", "なお", "Also / It should be noted", "add", "N3"],
  ["また", "また", "Also / Likewise", "add", "N3"],
  ["さらに", "さらに", "Furthermore / Even more", "add", "N3"],
  ["しかも", "しかも", "Even / Moreover", "add", "N3"],
  ["特に", "とくに", "Particularly / Especially", "add", "N3"],
  ["とりわけ", "とりわけ", "Above all / Most importantly", "add", "N3"],
  ["〜上に", "〜うえに", "Besides ~ / In addition to ~", "add", "N3"],
  ["〜ばかりでなく", "〜ばかりでなく", "Not only ~ / More than just ~", "add", "N3"],
  ["〜だけでなく", "〜だけでなく", "Not just ~ (casual)", "add", "N3"],
  ["〜と同時に", "〜とどうじに", "Simultaneously with ~ / At the same time", "add", "N3"],
  ["それゆえ", "それゆえ", "Therefore (formal/literary)", "conj", "N2"],
  ["ゆえに", "ゆえに", "Therefore / Thus (formal)", "conj", "N2"],
  ["従って", "したがって", "For that reason / Therefore", "conj", "N2"],
  ["〜からこそ", "〜からこそ", "Precisely because ~", "conj", "N2"],
  ["〜てこそ", "〜てこそ", "Precisely by ~ / Just by ~", "conj", "N2"],
  ["〜をふまえて", "〜をふまえて", "Based on ~ / Referring to ~", "conj", "N2"],
  ["〜を通じて", "〜をつうじて", "Through ~ / Via ~", "conj", "N2"],
  ["その反面", "そのはんめん", "On the other hand / Conversely", "cont", "N2"],
  ["それとは裏腹に", "それとはうらはらに", "In contrast / Contrary to that", "cont", "N2"],
  ["かといって", "かといって", "But that doesn't mean / Even so", "cont", "N2"],
  ["そうとはいえ", "そうとはいえ", "Nevertheless / Despite that", "cont", "N2"],
  ["とはいうものの", "とはいうものの", "Even so / However", "cont", "N2"],
  ["にもかかわらず", "にもかかわらず", "Although / Regardless of that", "cont", "N2"],
  ["せっかく〜のに", "せっかく〜のに", "What a shame that ~ even though ~", "cont", "N2"],
  ["しかるに", "しかるに", "Yet / However (formal/archaic)", "cont", "N2"],
  ["〜に反して", "〜にはんして", "Against ~ / Counter to ~", "cont", "N2"],
  ["〜はともかく", "〜はともかく", "Regardless of ~ / ~ doesn't matter", "cont", "N2"],
  ["〜はさておき", "〜はさておき", "Setting aside ~ / Leaving ~ for now", "cont", "N2"],
  ["ともかく", "ともかく", "Anyway / Regardless of that", "trans", "N2"],
  ["いずれにせよ", "いずれにせよ", "Anyway / In any case", "trans", "N2"],
  ["いずれにしても", "いずれにしても", "Anyway / Either way", "trans", "N2"],
  ["とにかく", "とにかく", "Anyway / The point is", "trans", "N2"],
  ["なんにせよ", "なんにせよ", "Whatever it is / Anyway", "trans", "N2"],
  ["ところで", "ところで", "Omong-omong / Ngomong-ngomong", "trans", "N2"],
  ["さて", "さて", "Nah / Baiklah (pergantian topik)", "trans", "N2"],
  ["では改めて", "ではあらためて", "Well then, once more", "trans", "N2"],
  ["あえて", "あえて", "On purpose / Even though it is difficult", "add", "N2"],
  ["もとより", "もとより", "From the beginning / Of course", "add", "N2"],
  ["むろん", "むろん", "Of course / Certainly", "add", "N2"],
  ["もちろん", "もちろん", "Tentu saja / Sudah pasti", "add", "N2"],
  ["言うまでもなく", "いうまでもなく", "Sudah jelas / Tak perlu dikatakan", "add", "N2"],
  ["ましてや", "ましてや", "Moreover / What's more", "add", "N2"],
  ["〜に加えて", "〜にくわえて", "In addition to ~ / Besides ~", "add", "N2"],
  ["〜に伴って", "〜にともなって", "Along with ~ / Accompanied by ~", "add", "N2"],
  ["〜と共に", "〜とともに", "Along with ~ / Together with ~", "add", "N2"],
  ["而して", "しかして", "And then / Thus (classical)", "conj", "N1"],
  ["よって", "よって", "Therefore / Thus (formal/legal)", "conj", "N1"],
  ["〜にほかならない", "〜にほかならない", "Tidak lain adalah ~ / Itulah ~", "conj", "N1"],
  ["〜そばから", "〜そばから", "As soon as ~ / Every time ~ immediately", "conj", "N1"],
  ["〜をもって", "〜をもって", "With ~ / Through ~ (formal)", "conj", "N1"],
  ["然るべく", "さるべく", "As it should be / Appropriately", "conj", "N1"],
  ["されど", "されど", "However / Nevertheless (archaic)", "cont", "N1"],
  ["しかるに", "しかるに", "Meski demikian (sastra/hukum)", "cont", "N1"],
  ["然るに", "しかるに", "Yet in reality (formal)", "cont", "N1"],
  ["もっとも", "もっとも", "Namun / Meski begitu (memperhalus)", "cont", "N1"],
  ["ただし", "ただし", "However, on the condition that / As long as", "cont", "N1"],
  ["かたや", "かたや", "On one hand / Meanwhile", "cont", "N1"],
  ["それどころか", "それどころか", "On the contrary / Rather", "cont", "N1"],
  ["かえって", "かえって", "Malah / Justru sebaliknya", "cont", "N1"],
  ["むしろ", "むしろ", "Rather / It's more accurate to say", "cont", "N1"],
  ["ひるがえって", "ひるがえって", "Jika dilihat sebaliknya / Sebaliknya", "cont", "N1"],
  ["これに対して", "これにたいして", "Terhadap hal ini / Sebagai respons", "cont", "N1"],
  ["〜をよそに", "〜をよそに", "Tanpa memperdulikan ~ / Mengabaikan ~", "cont", "N1"],
  ["それはそうと", "それはそうと", "By the way / Setting that aside", "trans", "N1"],
  ["はたまた", "はたまた", "Or even / And also (adds drama)", "add", "N1"],
  ["のみならず", "のみならず", "Not only that / Moreover (formal)", "add", "N1"],
  ["ひいては", "ひいては", "And ultimately / Even to the point of", "add", "N1"],
  ["おまけに", "おまけに", "Even beyond that / In addition to that", "add", "N1"],
  ["これに加えて", "これにくわえて", "On top of this / Moreover", "add", "N1"],
  ["なおかつ", "なおかつ", "And also / Even more than that", "add", "N1"],
  ["かつ", "かつ", "And / Together with (formal/legal)", "add", "N1"],
  ["並びに", "ならびに", "And / Together with (formal/legal)", "add", "N1"],
  ["及び", "および", "And / As well as (formal/legal)", "add", "N1"],
  ["〜に至っては", "〜にいたっては", "Even to the extent of ~ / Especially ~", "add", "N1"],
  ["〜とあいまって", "〜とあいまって", "Combined with ~ / Added to ~", "add", "N1"],
  ["〜もさることながら", "〜もさることながら", "Not only ~ / ~ goes without saying, but", "add", "N1"],
  ["〜はおろか", "〜はおろか", "Let alone ~ / Not to mention ~", "add", "N1"],
  ["〜すら", "〜すら", "Even ~ / Not even ~ (formal)", "add", "N1"],
  ["〜だに", "〜だに", "Even just ~ / Not even ~ (archaic)", "add", "N1"],
  ["〜とあれば", "〜とあれば", "If that is indeed ~ / If that is what is meant", "cond", "N1"],
  ["〜ともなると", "〜ともなると", "When it comes to ~ / Once ~", "cond", "N1"]
];
const advs = [["とても","とても","! Very / Extremely","deg","N5"],["すごく","すごく","! Very / Super (casual)","deg","N5"],["あまり〜ない","あまり〜ない","! Not very ~ / Rarely ~","deg","N5"],["全然〜ない","ぜんぜん〜ない","! Not at all ~","deg","N5"],["少し","すこし","! A little / Somewhat","deg","N5"],["ちょっと","ちょっと","! A bit / Just a little (casual)","deg","N5"],["もっと","もっと","! More / Even more","deg","N5"],["一番","いちばん","! Most / Number one","deg","N5"],["だいたい","だいたい","! About / Mostly","deg","N5"],["あまり","あまり","! Too / Very (before negative)","deg","N5"],["大体","だいたい","! About / Approximately","deg","N5"],["いつも","いつも","! Always / All the time","freq","N5"],["よく","よく","! Often / Well","freq","N5"],["時々","ときどき","! Sometimes","freq","N5"],["たまに","たまに","! Occasionally / Rarely","freq","N5"],["全然","ぜんぜん","! Not at all / Completely (used in negative)","freq","N5"],["今","いま","! Now / At this moment","time","N5"],["もう","もう","! Already / Anymore","time","N5"],["まだ","まだ","! Still / Not yet","time","N5"],["もうすぐ","もうすぐ","! Soon / Almost","time","N5"],["これから","これから","! From now on / Starting now","time","N5"],["さっき","さっき","! Just now / A moment ago","time","N5"],["あとで","あとで","! Later / After this","time","N5"],["また","また","! Again / Once more","time","N5"],["初めて","はじめて","! For the first time","time","N5"],["先に","さきに","! First / Ahead of time","time","N5"],["後で","あとで","! Later / After that","time","N5"],["一緒に","いっしょに","! Together","mann","N5"],["ゆっくり","ゆっくり","! Slowly / Take it easy","mann","N5"],["はっきり","はっきり","! Clearly / Openly","mann","N5"],["どうぞ","どうぞ","! Please / Go ahead / Here you go","mann","N5"],["どうも","どうも","! Thanks / Sorry (casual)","mann","N5"],["本当に","ほんとうに","! Truly / Really","mann","N5"],["たくさん","たくさん","! A lot / Very much","quant","N5"],["かなり","かなり","! Fairly / Reasonably / Quite a lot","deg","N4"],["非常に","ひじょうに","! Very / Extremely (formal)","deg","N4"],["相当","そうとう","! Fairly large / Considerably","deg","N4"],["特に","とくに","! Especially / In particular","deg","N4"],["なかなか","なかなか","! Quite (positive) / Not easy (negative)","deg","N4"],["ずいぶん","ずいぶん","! Very / Quite a lot","deg","N4"],["ちょうど","ちょうど","! Exactly / Precisely","deg","N4"],["だいぶ","だいぶ","! Considerably / Fairly a lot","deg","N4"],["少々","しょうしょう","A little (formal) / Briefly","deg","N4"],["割と","わりと","Quite / More than expected","deg","N4"],["まだまだ","まだまだ","Still far / Not enough yet","deg","N4"],["たいてい","たいてい","! Usually / Generally","freq","N4"],["必ず","かならず","! Certainly / Without exception","freq","N4"],["絶対に","ぜったいに","! Definitely / Absolutely / By all means","freq","N4"],["一度","いちど","Once / One time","freq","N4"],["二度","にど","Twice / Once more","freq","N4"],["だんだん","だんだん","! Gradually / More and more","time","N4"],["どんどん","どんどん","! Rapidly / More and more / Progressively","time","N4"],["すぐに","すぐに","! Immediately / Right away","time","N4"],["急に","きゅうに","! Suddenly / All of a sudden","time","N4"],["突然","とつぜん","! Suddenly / Abruptly","time","N4"],["最近","さいきん","! Recently / Lately","time","N4"],["以前","いぜん","! Before / Previously","time","N4"],["前もって","まえもって","First / Beforehand","time","N4"],["ずっと","ずっと","! Continuously / All along / All this time","time","N4"],["いつか","いつか","Someday / At some point","time","N4"],["そのうち","そのうち","Before long / At some point","time","N4"],["そろそろ","そろそろ","! Soon / It's almost time","time","N4"],["早速","さっそく","Immediately / Right after that","time","N4"],["丁度","ちょうど","Exactly on time / Just right","time","N4"],["いきなり","いきなり","! Suddenly (without warning)","time","N4"],["久しぶりに","ひさしぶりに","! After a long time / For the first time in a while","time","N4"],["ちゃんと","ちゃんと","! Properly / Correctly","mann","N4"],["きちんと","きちんと","! Neatly / In an orderly manner","mann","N4"],["しっかり","しっかり","! Firmly / Earnestly","mann","N4"],["すっかり","すっかり","! Completely / Entirely","mann","N4"],["なるべく","なるべく","! As much as possible","mann","N4"],["できるだけ","できるだけ","! As much as possible / To the best of one's ability","mann","N4"],["ぜひ","ぜひ","! Please (sincerely) / Earnestly","mann","N4"],["わざと","わざと","! On purpose / Intentionally","mann","N4"],["わざわざ","わざわざ","! Going out of one's way / Taking the trouble to","mann","N4"],["丁寧に","ていねいに","! Politely / Carefully","mann","N4"],["自由に","じゆうに","Freely / As one pleases","mann","N4"],["一人で","ひとりで","Alone / By oneself","mann","N4"],["別々に","べつべつに","Separately / Individually","mann","N4"],["せっかく","せっかく","! With great effort / Painstakingly","mann","N4"],["改めて","あらためて","Once more / Seriously","mann","N4"],["一応","いちおう","! Just in case / For now / Tentatively","mann","N4"],["ほとんど","ほとんど","! Almost all / The majority","quant","N4"],["もちろん","もちろん","! Of course / Certainly","affirm","N4"],["やはり","やはり","! It turns out / As expected","affirm","N4"],["やっぱり","やっぱり","! Turns out / As expected (casual)","affirm","N4"],["もしかして","もしかして","! I wonder if / Perhaps","affirm","N4"],["案外","あんがい","! Unexpectedly / Contrary to expectations","affirm","N4"],["どうせ","どうせ","! Anyway / Either way","affirm","N4"],["極めて","きわめて","Very / Extremely (formal/literary)","deg","N3"],["著しく","いちじるしく","Noticeably / Remarkably","deg","N3"],["かえって","かえって","On the contrary / All the more so","deg","N3"],["むしろ","むしろ","Rather / It's more accurate to say","deg","N3"],["せめて","せめて","At least / If nothing else","deg","N3"],["いっそ","いっそ","While we're at it / Might as well","deg","N3"],["やや","やや","Somewhat / Slightly (formal)","deg","N3"],["常に","つねに","Always / At all times","freq","N3"],["しばしば","しばしば","Often / Frequently","freq","N3"],["めったに〜ない","めったに〜ない","Very rarely ~ / Almost never ~","freq","N3"],["めったに","めったに","Rarely / Almost never","freq","N3"],["たびたび","たびたび","Repeatedly / Often","freq","N3"],["引き続き","ひきつづき","Continuing / Going forward / Next","time","N3"],["相変わらず","あいかわらず","As usual / Same as before","time","N3"],["いよいよ","いよいよ","Eventually / Increasingly (approaching)","time","N3"],["とうとう","とうとう","Finally / In the end","time","N3"],["ついに","ついに","At last / After a long time","time","N3"],["今さら","いまさら","Only now ~ (too late) / Too late now","time","N3"],["今ごろ","いまごろ","By now / Should be around now","time","N3"],["あらかじめ","あらかじめ","Before / First","time","N3"],["間もなく","まもなく","Soon / Before long","time","N3"],["以来","いらい","Since then / Ever since","time","N3"],["今後","こんご","Going forward / From now on","time","N3"],["当初","とうしょ","At first / Originally / Initially","time","N3"],["次第に","しだいに","Gradually / Little by little","time","N3"],["徐々に","じょじょに","Little by little / Gradually","time","N3"],["ひとまず","ひとまず","For now / First of all / In the meantime","mann","N3"],["あえて","あえて","Deliberately / Even though it's difficult","mann","N3"],["さっさと","さっさと","Quickly / Hurriedly","mann","N3"],["ぐっと","ぐっと","With full effort / Going even further","mann","N3"],["ふと","ふと","Spontaneously / Without realizing","mann","N3"],["うっかり","うっかり","Carelessly / Absentmindedly","mann","N3"],["わずかに","わずかに","Barely / Hardly at all","quant","N3"],["大半","たいはん","The majority / Most of","quant","N3"],["全体的に","ぜんたいてきに","Overall / In general","quant","N3"],["まさか","まさか","No way / Surely not","affirm","N3"],["まさに","まさに","Exactly right / Indeed correct","affirm","N3"],["たしかに","たしかに","Indeed / Of course / Right","affirm","N3"],["なるほど","なるほど","Indeed / I see / Of course","affirm","N3"],["案の定","あんのじょう","Just as expected / Exactly as predicted","affirm","N3"],["きっと","きっと","Certainly / Of course","affirm","N3"],["おそらく","おそらく","Probably / Most likely","affirm","N3"],["たぶん","たぶん","Maybe / Probably","affirm","N3"],["どうやら","どうやら","Apparently / It seems","affirm","N3"]];
const adjs = [
  ["新しい", "あたらしい", "! New", "i", "N5"],
  ["古い", "ふるい", "! Old (thing)", "i", "N5"],
  ["大きい", "おおきい", "! Big / Large", "i", "N5"],
  ["小さい", "ちいさい", "! Small / Little", "i", "N5"],
  ["高い", "たかい", "! Tall / High / Expensive", "i", "N5"],
  ["低い", "ひくい", "! Short / Low", "i", "N5"],
  ["安い", "やすい", "! Cheap / Inexpensive", "i", "N5"],
  ["長い", "ながい", "! Long", "i", "N5"],
  ["短い", "みじかい", "! Short", "i", "N5"],
  ["広い", "ひろい", "! Wide / Spacious", "i", "N5"],
  ["狭い", "せまい", "! Narrow / Small (space)", "i", "N5"],
  ["多い", "おおい", "! Many / Much", "i", "N5"],
  ["少ない", "すくない", "! Few / Little", "i", "N5"],
  ["速い", "はやい", "! Fast / Quick", "i", "N5"],
  ["遅い", "おそい", "! Late / Slow", "i", "N5"],
  ["早い", "はやい", "! Early / Fast (time)", "i", "N5"],
  ["良い", "よい／いい", "! Good / Fine", "i", "N5"],
  ["悪い", "わるい", "! Bad / Evil", "i", "N5"],
  ["難しい", "むずかしい", "! Difficult", "i", "N5"],
  ["易しい", "やさしい", "! Easy", "i", "N5"],
  ["面白い", "おもしろい", "! Interesting / Funny", "i", "N5"],
  ["つまらない", "つまらない", "! Boring", "i", "N5"],
  ["楽しい", "たのしい", "! Fun / Enjoyable", "i", "N5"],
  ["悲しい", "かなしい", "! Sad / Sorrowful", "i", "N5"],
  ["怖い", "こわい", "! Scary / Frightening", "i", "N5"],
  ["嬉しい", "うれしい", "! Happy / Joyful", "i", "N5"],
  ["恥ずかしい", "はずかしい", "! Embarrassed / Shy", "i", "N5"],
  ["痛い", "いたい", "! Sick / Painful", "i", "N5"],
  ["眠い", "ねむい", "! Sleepy / Drowsy", "i", "N5"],
  ["暑い", "あつい", "! Hot (weather)", "i", "N5"],
  ["寒い", "さむい", "! Cold (weather)", "i", "N5"],
  ["熱い", "あつい", "! Hot (to touch)", "i", "N5"],
  ["冷たい", "つめたい", "! Cold (to touch)", "i", "N5"],
  ["暖かい", "あたたかい", "! Warm", "i", "N5"],
  ["涼しい", "すずしい", "! Cool / Refreshing", "i", "N5"],
  ["甘い", "あまい", "! Sweet", "i", "N5"],
  ["辛い", "からい", "! Spicy", "i", "N5"],
  ["苦い", "にがい", "! Bitter", "i", "N5"],
  ["しょっぱい", "しょっぱい", "! Salty", "i", "N5"],
  ["酸っぱい", "すっぱい", "! Sour", "i", "N5"],
  ["おいしい", "おいしい", "! Delicious", "i", "N5"],
  ["まずい", "まずい", "! Tastes bad / Unpleasant", "i", "N5"],
  ["重い", "おもい", "! Heavy", "i", "N5"],
  ["軽い", "かるい", "! Light (weight)", "i", "N5"],
  ["硬い", "かたい", "! Hard / Stiff", "i", "N5"],
  ["柔らかい", "やわらかい", "! Soft", "i", "N5"],
  ["丸い", "まるい", "! Round / Circular", "i", "N5"],
  ["四角い", "しかくい", "! Square / Rectangular", "i", "N5"],
  ["近い", "ちかい", "! Near / Close", "i", "N5"],
  ["遠い", "とおい", "! Far / Distant", "i", "N5"],
  ["明るい", "あかるい", "! Bright / Light", "i", "N5"],
  ["暗い", "くらい", "! Dark", "i", "N5"],
  ["若い", "わかい", "! Young", "i", "N5"],
  ["忙しい", "いそがしい", "! Busy", "i", "N5"],
  ["寂しい", "さびしい", "! Lonely", "i", "N5"],
  ["正しい", "ただしい", "! Correct / Precise", "i", "N5"],
  ["欲しい", "ほしい", "! Wanted / Desired", "i", "N5"],
  ["白い", "しろい", "! White", "i", "N5"],
  ["黒い", "くろい", "! Black", "i", "N5"],
  ["赤い", "あかい", "! Red", "i", "N5"],
  ["青い", "あおい", "! Blue / Green", "i", "N5"],
  ["黄色い", "きいろい", "! Yellow", "i", "N5"],
  ["すごい", "すごい", "! Amazing / Awesome", "i", "N5"],
  ["かわいい", "かわいい", "! Cute / Adorable", "i", "N5"],
  ["美しい", "うつくしい", "! Beautiful / Pretty", "i", "N5"],
  ["汚い", "きたない", "! Dirty / Filthy", "i", "N5"],
  ["気持ちいい", "きもちいい", "! Comfortable / Pleasant", "i", "N5"],
  ["気持ち悪い", "きもちわるい", "! Disgusting / Unpleasant", "i", "N5"],
  ["ふるい", "ふるい", "! Old-fashioned / Dated", "i", "N5"],
  ["にぎやかい", "にぎやかい", "! Lively / Bustling", "i", "N5"],
  ["やわらかい", "やわらかい", "! Soft / Springy", "i", "N5"],
  ["うすい", "うすい", "! Thin / Pale", "i", "N5"],
  ["すっぱい", "すっぱい", "! Sour", "i", "N5"],
  ["からい", "からい", "! Spicy / Salty", "i", "N5"],
  ["ひろい", "ひろい", "! Wide / Spacious", "i", "N5"],
  ["せまい", "せまい", "! Narrow / Small (space)", "i", "N5"],
  ["おおい", "おおい", "! Many / Much", "i", "N5"],
  ["すくない", "すくない", "! Few / Little", "i", "N5"],
  ["うれしい", "うれしい", "! Happy / Joyful", "i", "N5"],
  ["かなしい", "かなしい", "! Sad / Sorrowful", "i", "N5"],
  ["こわい", "こわい", "! Scary / Frightening", "i", "N5"],
  ["はずかしい", "はずかしい", "! Embarrassed / Shy", "i", "N5"],
  ["いたい", "いたい", "! Sick / Painful", "i", "N5"],
  ["ねむい", "ねむい", "! Sleepy / Drowsy", "i", "N5"],
  ["さびしい", "さびしい", "! Lonely", "i", "N5"],
  ["ただしい", "ただしい", "! Correct / Precise", "i", "N5"],
  ["ほしい", "ほしい", "! Wanted / Desired", "i", "N5"],
  ["きたない", "きたない", "! Dirty / Filthy", "i", "N5"],
  ["うつくしい", "うつくしい", "! Beautiful / Pretty", "i", "N5"],
  ["おもしろい", "おもしろい", "! Interesting / Funny", "i", "N5"],
  ["たのしい", "たのしい", "! Fun / Enjoyable", "i", "N5"],
  ["むずかしい", "むずかしい", "! Difficult", "i", "N5"],
  ["やさしい", "やさしい", "! Easy / Kind-hearted", "i", "N5"],
  ["つよい", "つよい", "! Strong", "i", "N5"],
  ["よわい", "よわい", "! Weak", "i", "N5"],
  ["おもい", "おもい", "! Heavy", "i", "N5"],
  ["かるい", "かるい", "! Light (weight)", "i", "N5"],
  ["かたい", "かたい", "! Hard / Stiff", "i", "N5"],
  ["まるい", "まるい", "! Round / Circular", "i", "N5"],
  ["しかくい", "しかくい", "! Square / Rectangular", "i", "N5"],
  ["ちかい", "ちかい", "! Near / Close", "i", "N5"],
  ["とおい", "とおい", "! Far / Distant", "i", "N5"],
  ["あかるい", "あかるい", "! Bright / Light", "i", "N5"],
  ["くらい", "くらい", "! Dark", "i", "N5"],
  ["わかい", "わかい", "! Young", "i", "N5"],
  ["いそがしい", "いそがしい", "! Busy", "i", "N5"],
  ["たかい", "たかい", "! Tall / High / Expensive", "i", "N5"],
  ["ひくい", "ひくい", "! Short / Low", "i", "N5"],
  ["やすい", "やすい", "! Cheap / Inexpensive", "i", "N5"],
  ["ながい", "ながい", "! Long", "i", "N5"],
  ["みじかい", "みじかい", "! Short", "i", "N5"],
  ["おおきい", "おおきい", "! Big / Large", "i", "N5"],
  ["ちいさい", "ちいさい", "! Small / Little", "i", "N5"],
  ["あたらしい", "あたらしい", "! New", "i", "N5"],
  ["よい", "よい", "! Good / Fine", "i", "N5"],
  ["わるい", "わるい", "! Bad / Evil", "i", "N5"],
  ["はやい", "はやい", "! Fast / Early", "i", "N5"],
  ["おそい", "おそい", "! Late / Slow", "i", "N5"],
  ["あつい", "あつい", "! Hot (weather/touch)", "i", "N5"],
  ["さむい", "さむい", "! Cold (weather)", "i", "N5"],
  ["つめたい", "つめたい", "! Cold (to touch)", "i", "N5"],
  ["あたたかい", "あたたかい", "! Warm", "i", "N5"],
  ["すずしい", "すずしい", "! Cool / Refreshing", "i", "N5"],
  ["あまい", "あまい", "! Sweet", "i", "N5"],
  ["にがい", "にがい", "! Bitter", "i", "N5"],
  ["しろい", "しろい", "! White", "i", "N5"],
  ["くろい", "くろい", "! Black", "i", "N5"],
  ["あかい", "あかい", "! Red", "i", "N5"],
  ["あおい", "あおい", "! Blue / Green", "i", "N5"],
  ["きいろい", "きいろい", "! Yellow", "i", "N5"],
  ["好きな", "すきな", "! Liked / Favorite", "na", "N5"],
  ["嫌いな", "きらいな", "! Disliked / Hated", "na", "N5"],
  ["上手な", "じょうずな", "! Skilled / Good at", "na", "N5"],
  ["下手な", "へたな", "! Unskilled / Poor at", "na", "N5"],
  ["有名な", "ゆうめいな", "! Famous / Popular", "na", "N5"],
  ["大切な", "たいせつな", "! Important / Precious", "na", "N5"],
  ["大丈夫な", "だいじょうぶな", "! It's fine / I'm OK", "na", "N5"],
  ["元気な", "げんきな", "! Healthy / Energetic", "na", "N5"],
  ["親切な", "しんせつな", "! Kind / Friendly", "na", "N5"],
  ["丁寧な", "ていねいな", "! Polite / Careful", "na", "N5"],
  ["静かな", "しずかな", "! Quiet / Calm", "na", "N5"],
  ["賑やかな", "にぎやかな", "! Lively / Festive", "na", "N5"],
  ["きれいな", "きれいな", "! Beautiful / Clean", "na", "N5"],
  ["暇な", "ひまな", "! Free / Not busy", "na", "N5"],
  ["便利な", "べんりな", "! Convenient / Useful", "na", "N5"],
  ["不便な", "ふべんな", "! Inconvenient / Uncomfortable", "na", "N5"],
  ["大変な", "たいへんな", "! Hard / Tough", "na", "N5"],
  ["必要な", "ひつような", "! Necessary", "na", "N5"],
  ["真面目な", "まじめな", "! Serious / Diligent", "na", "N5"],
  ["色々な", "いろいろな", "! Various / Diverse", "na", "N5"],
  ["大好きな", "だいすきな", "! Loved / Favorite", "na", "N5"],
  ["大嫌いな", "だいきらいな", "! Hated / Despised", "na", "N5"],
  ["得意な", "とくいな", "! Good at / Expert in", "na", "N5"],
  ["苦手な", "にがてな", "! Not good at / Dislikes", "na", "N5"],
  ["大事な", "だいじな", "! Important / Precious", "na", "N5"],
  ["にぎやかな", "にぎやかな", "! Lively / Festive", "na", "N5"],
  ["厚い", "あつい", "! Thick", "i", "N4"],
  ["薄い", "うすい", "! Thin", "i", "N4"],
  ["細い", "ほそい", "! Slender / Thin (object)", "i", "N4"],
  ["太い", "ふとい", "! Thick / Fat (object)", "i", "N4"],
  ["深い", "ふかい", "! Deep", "i", "N4"],
  ["浅い", "あさい", "! Shallow", "i", "N4"],
  ["強い", "つよい", "! Strong", "i", "N4"],
  ["弱い", "よわい", "! Weak", "i", "N4"],
  ["固い", "かたい", "! Hard / Firm", "i", "N4"],
  ["羨ましい", "うらやましい", "! Envious / Jealous", "i", "N4"],
  ["怪しい", "あやしい", "Suspicious / Strange", "i", "N4"],
  ["珍しい", "めずらしい", "! Rare / Uncommon", "i", "N4"],
  ["懐かしい", "なつかしい", "! Nostalgic / Missed", "i", "N4"],
  ["惜しい", "おしい", "! What a waste / So close", "i", "N4"],
  ["厳しい", "きびしい", "! Strict / Harsh (discipline)", "i", "N4"],
  ["優しい", "やさしい", "! Gentle / Kind-hearted", "i", "N4"],
  ["賢い", "かしこい", "! Clever / Intelligent", "i", "N4"],
  ["鋭い", "するどい", "Sharp / Keen", "i", "N4"],
  ["鈍い", "にぶい", "Dull / Slow", "i", "N4"],
  ["激しい", "はげしい", "! Intense / Fierce", "i", "N4"],
  ["荒い", "あらい", "Rough / Coarse", "i", "N4"],
  ["細かい", "こまかい", "! Detailed / Fine", "i", "N4"],
  ["親しい", "したしい", "! Close / Intimate (relationship)", "i", "N4"],
  ["苦しい", "くるしい", "! Painful / Suffocating", "i", "N4"],
  ["悔しい", "くやしい", "! Frustrated / Regretful", "i", "N4"],
  ["憎い", "にくい", "Hateful / Annoying", "i", "N4"],
  ["眩しい", "まぶしい", "Dazzling / Glaring", "i", "N4"],
  ["臭い", "くさい", "! Smelly / Stinky", "i", "N4"],
  ["香ばしい", "こうばしい", "Fragrant (roasted)", "i", "N4"],
  ["騒がしい", "さわがしい", "! Noisy / Rowdy", "i", "N4"],
  ["怠い", "だるい", "Sluggish / Achy", "i", "N4"],
  ["頼もしい", "たのもしい", "Reliable / Dependable", "i", "N4"],
  ["清々しい", "すがすがしい", "Refreshing / Pleasant", "i", "N4"],
  ["相応しい", "ふさわしい", "Suitable / Appropriate", "i", "N4"],
  ["ありがたい", "ありがたい", "! Grateful / Thankful", "i", "N4"],
  ["情けない", "なさけない", "! Pathetic / Shameful", "i", "N4"],
  ["素晴らしい", "すばらしい", "! Wonderful / Amazing", "i", "N4"],
  ["眠たい", "ねむたい", "Very sleepy / Drowsy", "i", "N4"],
  ["恋しい", "こいしい", "Longing for / Missing", "i", "N4"],
  ["むごい", "むごい", "Cruel / Brutal", "i", "N4"],
  ["ずるい", "ずるい", "Sly / Cheating", "i", "N4"],
  ["あさましい", "あさましい", "Base / Shameful", "i", "N4"],
  ["ひどい", "ひどい", "! Terrible / Cruel", "i", "N4"],
  ["うるさい", "うるさい", "! Noisy / Talkative", "i", "N4"],
  ["やかましい", "やかましい", "Noisy / Nagging", "i", "N4"],
  ["おかしい", "おかしい", "! Strange / Funny", "i", "N4"],
  ["むずがゆい", "むずがゆい", "Itchy / Eager to do", "i", "N4"],
  ["なつかしい", "なつかしい", "Nostalgic / Missed", "i", "N4"],
  ["もったいない", "もったいない", "! Wasteful / What a shame", "i", "N4"],
  ["だらしない", "だらしない", "Sloppy / Messy", "i", "N4"],
  ["たくましい", "たくましい", "Muscular / Tough", "i", "N4"],
  ["あっけない", "あっけない", "Too brief / Anticlimactic", "i", "N4"],
  ["むなしい", "むなしい", "Empty / Pointless", "i", "N4"],
  ["いたわしい", "いたわしい", "Pitiful / Sad", "i", "N4"],
  ["貧しい", "まずしい", "! Poor / Destitute", "i", "N4"],
  ["詳しい", "くわしい", "! Detailed / Expert", "i", "N4"],
  ["粗い", "あらい", "Rough (texture)", "i", "N4"],
  ["ゆるい", "ゆるい", "Loose / Not tight", "i", "N4"],
  ["きつい", "きつい", "! Tight / Strict", "i", "N4"],
  ["ゆったりした", "ゆったりした", "Loose / Roomy (clothing)", "i", "N4"],
  ["ぼんやりした", "ぼんやりした", "Vague / Unclear", "i", "N4"],
  ["わずらわしい", "わずらわしい", "Troublesome / Annoying", "i", "N4"],
  ["恐ろしい", "おそろしい", "! Horrifying / Terrifying", "i", "N4"],
  ["あぶない", "あぶない", "! Dangerous / Watch out", "i", "N4"],
  ["なれなれしい", "なれなれしい", "Too familiar / Overly casual", "i", "N4"],
  ["すがすがしい", "すがすがしい", "Refreshing / Clear (feeling)", "i", "N4"],
  ["そそっかしい", "そそっかしい", "Careless / Reckless", "i", "N4"],
  ["おとなしい", "おとなしい", "Quiet / Obedient", "i", "N4"],
  ["面倒くさい", "めんどうくさい", "Lazy / Bothersome", "i", "N4"],
  ["においがする", "においがする", "Smells / Has an odor", "i", "N4"],
  ["まぶしい", "まぶしい", "Dazzling / Blinding", "i", "N4"],
  ["くすぐったい", "くすぐったい", "Ticklish / Giggly", "i", "N4"],
  ["かゆい", "かゆい", "Itchy", "i", "N4"],
  ["ひもじい", "ひもじい", "Hungry / Starving", "i", "N4"],
  ["ゆかしい", "ゆかしい", "Elegant / Charming", "i", "N4"],
  ["やむをえない", "やむをえない", "Unavoidable / Forced", "i", "N4"],
  ["おそろしい", "おそろしい", "Terrible / Very frightening", "i", "N4"],
  ["まずしい", "まずしい", "Poor / Lacking everything", "i", "N4"],
  ["ふさわしい", "ふさわしい", "Suitable / Fitting", "i", "N4"],
  ["はかない", "はかない", "Fleeting / Transient", "i", "N4"],
  ["うとい", "うとい", "Unfamiliar / Out of touch", "i", "N4"],
  ["みっともない", "みっともない", "Embarrassing / Shameful", "i", "N4"],
  ["かたくるしい", "かたくるしい", "Formal / Stiff", "i", "N4"],
  ["めんどうくさい", "めんどうくさい", "Tedious / Bothersome", "i", "N4"],
  ["もどかしい", "もどかしい", "Frustrated / Impatient", "i", "N4"],
  ["きびしい", "きびしい", "Strict / Firm", "i", "N4"],
  ["かしこい", "かしこい", "Smart / Clever", "i", "N4"],
  ["おしい", "おしい", "So close / What a shame", "i", "N4"],
  ["たよりない", "たよりない", "Unreliable", "i", "N4"],
  ["おもたい", "おもたい", "Feels heavy / Oppressive", "i", "N4"],
  ["ぬるい", "ぬるい", "Lukewarm / Wishy-washy", "i", "N4"],
  ["まちどおしい", "まちどおしい", "Eagerly awaiting", "i", "N4"],
  ["たのもしい", "たのもしい", "Reliable / Reassuring", "i", "N4"],
  ["ものたりない", "ものたりない", "Unsatisfying / Lacking", "i", "N4"],
  ["そろっている", "そろっている", "Complete / All available", "i", "N4"],
  ["こころよい", "こころよい", "Comfortable / Pleasant", "i", "N4"],
  ["こころぐるしい", "こころぐるしい", "Uneasy / Troubled", "i", "N4"],
  ["せつない", "せつない", "Sad / Heartbreaking / Longing", "i", "N4"],
  ["かわいそうな", "かわいそうな", "Pitiful / Poor thing", "i", "N4"],
  ["まともな", "まともな", "Normal / Decent / Serious", "i", "N4"],
  ["みじめな", "みじめな", "Miserable / Pitiable", "i", "N4"],
  ["やばい", "やばい", "Dangerous / Amazing (slang)", "i", "N4"],
  ["えらい", "えらい", "Great / High-ranking", "i", "N4"],
  ["うまい", "うまい", "! Delicious / Skilled", "i", "N4"],
  ["めずらしい", "めずらしい", "Rare / Unusual", "i", "N4"],
  ["すてきな", "すてきな", "Wonderful / Great", "i", "N4"],
  ["ハードな", "ハードな", "Hard / Heavy (work)", "i", "N4"],
  ["ソフトな", "ソフトな", "Soft / Easygoing", "i", "N4"],
  ["ナイスな", "ナイスな", "Nice / Cool", "i", "N4"],
  ["クールな", "クールな", "Cool / Composed", "i", "N4"],
  ["ホットな", "ホットな", "Hot / Trending (news)", "i", "N4"],
  ["あいまいな", "あいまいな", "Ambiguous / Unclear", "i", "N4"],
  ["あからさまな", "あからさまな", "Obvious / Blatant", "i", "N4"],
  ["あっさりした", "あっさりした", "Light / Not heavy (flavor)", "i", "N4"],
  ["こってりした", "こってりした", "Rich flavor / Heavy (food)", "i", "N4"],
  ["すっきりした", "すっきりした", "Refreshed / Clear", "i", "N4"],
  ["ふっくらした", "ふっくらした", "Plump / Fluffy", "i", "N4"],
  ["ぱっとしない", "ぱっとしない", "Unremarkable / Plain", "i", "N4"],
  ["さっぱりした", "さっぱりした", "Refreshing / Easygoing", "i", "N4"],
  ["もっさりした", "もっさりした", "Slow / Unfashionable", "i", "N4"],
  ["ふんわりした", "ふんわりした", "Fluffy / Softly puffed", "i", "N4"],
  ["しみじみした", "しみじみした", "Deeply felt / Heartfelt", "i", "N4"],
  ["はきはきした", "はきはきした", "Assertive / Energetic", "i", "N4"],
  ["しっかりした", "しっかりした", "Solid / Dependable", "i", "N4"],
  ["がっちりした", "がっちりした", "Sturdy / Well-built", "i", "N4"],
  ["すんなりした", "すんなりした", "Slender / Smooth", "i", "N4"],
  ["ひょろっとした", "ひょろっとした", "Lanky / Tall and thin", "i", "N4"],
  ["でかい", "でかい", "Huge / Really big (casual)", "i", "N4"],
  ["ちっちゃい", "ちっちゃい", "Tiny / Very small (casual)", "i", "N4"],
  ["こまい", "こまい", "Small / Detailed (dialect)", "i", "N4"],
  ["複雑な", "ふくざつな", "! Complex / Complicated", "na", "N4"],
  ["簡単な", "かんたんな", "! Easy / Simple", "na", "N4"],
  ["安全な", "あんぜんな", "! Safe / Secure", "na", "N4"],
  ["危険な", "きけんな", "! Dangerous", "na", "N4"],
  ["自由な", "じゆうな", "! Free / Independent", "na", "N4"],
  ["平和な", "へいわな", "! Peaceful", "na", "N4"],
  ["正直な", "しょうじきな", "! Honest", "na", "N4"],
  ["不思議な", "ふしぎな", "! Strange / Mysterious", "na", "N4"],
  ["幸せな", "しあわせな", "! Happy", "na", "N4"],
  ["不幸な", "ふこうな", "Unhappy / Unfortunate", "na", "N4"],
  ["可能な", "かのうな", "! Possible / Feasible", "na", "N4"],
  ["不可能な", "ふかのうな", "Impossible", "na", "N4"],
  ["熱心な", "ねっしんな", "! Enthusiastic / Diligent", "na", "N4"],
  ["怠惰な", "たいだな", "Lazy", "na", "N4"],
  ["丈夫な", "じょうぶな", "! Strong / Durable", "na", "N4"],
  ["軟弱な", "なんじゃくな", "Weak / Fragile", "na", "N4"],
  ["素直な", "すなおな", "! Obedient / Sincere", "na", "N4"],
  ["頑固な", "がんこな", "! Stubborn / Firm", "na", "N4"],
  ["活発な", "かっぱつな", "! Active / Full of energy", "na", "N4"],
  ["穏やかな", "おだやかな", "! Calm / Gentle", "na", "N4"],
  ["贅沢な", "ぜいたくな", "Luxurious / Extravagant", "na", "N4"],
  ["質素な", "しっそな", "Simple / Frugal", "na", "N4"],
  ["器用な", "きような", "! Skilled / Nimble", "na", "N4"],
  ["不器用な", "ぶきような", "! Clumsy / Unskilled", "na", "N4"],
  ["同じな", "おなじな", "Same", "na", "N4"],
  ["様々な", "さまざまな", "! Various / Diverse", "na", "N4"],
  ["十分な", "じゅうぶんな", "! Enough / Sufficient", "na", "N4"],
  ["不十分な", "ふじゅうぶんな", "Insufficient", "na", "N4"],
  ["特別な", "とくべつな", "! Special / Exceptional", "na", "N4"],
  ["普通な", "ふつうな", "Ordinary / Normal", "na", "N4"],
  ["確かな", "たしかな", "! Certain / Sure", "na", "N4"],
  ["曖昧な", "あいまいな", "Ambiguous / Unclear", "na", "N4"],
  ["適切な", "てきせつな", "Appropriate / Fitting", "na", "N4"],
  ["柔軟な", "じゅうなんな", "Flexible", "na", "N4"],
  ["重要な", "じゅうような", "! Important", "na", "N4"],
  ["具体的な", "ぐたいてきな", "! Concrete / Specific", "na", "N4"],
  ["抽象的な", "ちゅうしょうてきな", "Abstract", "na", "N4"],
  ["積極的な", "せっきょくてきな", "! Proactive / Active", "na", "N4"],
  ["消極的な", "しょうきょくてきな", "Passive / Inactive", "na", "N4"],
  ["新鮮な", "しんせんな", "! Fresh / New (food/idea)", "na", "N4"],
  ["親密な", "しんみつな", "Close / Intimate", "na", "N4"],
  ["冷静な", "れいせいな", "! Calm / Not panicking", "na", "N4"],
  ["敏感な", "びんかんな", "Sensitive / Perceptive", "na", "N4"],
  ["鈍感な", "どんかんな", "Insensitive / Slow to notice", "na", "N4"],
  ["勤勉な", "きんべんな", "Hardworking / Diligent", "na", "N4"],
  ["華やかな", "はなやかな", "Bright / Colorful", "na", "N4"],
  ["地味な", "じみな", "! Simple / Understated", "na", "N4"],
  ["派手な", "はでな", "! Flashy / Flamboyant", "na", "N4"],
  ["無駄な", "むだな", "Useless / Wasteful", "na", "N4"],
  ["有効な", "ゆうこうな", "Effective / Valid", "na", "N4"],
  ["無効な", "むこうな", "Invalid / Not valid", "na", "N4"],
  ["明らかな", "あきらかな", "Clear / Obvious", "na", "N4"],
  ["当然な", "とうぜんな", "! Natural / Expected", "na", "N4"],
  ["意外な", "いがいな", "! Unexpected / Surprising", "na", "N4"],
  ["急な", "きゅうな", "! Sudden / Abrupt", "na", "N4"],
  ["主な", "おもな", "! Main / Primary", "na", "N4"],
  ["様な", "ような", "Like / Similar to", "na", "N4"],
  ["豊かな", "ゆたかな", "Rich / Abundant", "na", "N4"],
  ["正確な", "せいかくな", "! Accurate / Precise", "na", "N4"],
  ["不正確な", "ふせいかくな", "Inaccurate", "na", "N4"],
  ["滑らかな", "なめらかな", "Smooth / Sleek", "na", "N4"],
  ["清潔な", "せいけつな", "! Clean / Hygienic", "na", "N4"],
  ["不潔な", "ふけつな", "Dirty / Unhygienic", "na", "N4"],
  ["平等な", "びょうどうな", "! Equal / Fair", "na", "N4"],
  ["不平等な", "ふびょうどうな", "Unequal / Unfair", "na", "N4"],
  ["合理的な", "ごうりてきな", "Rational / Reasonable", "na", "N4"],
  ["非合理的な", "ひごうりてきな", "Irrational", "na", "N4"],
  ["効率的な", "こうりつてきな", "Efficient", "na", "N4"],
  ["非効率な", "ひこうりつな", "Inefficient", "na", "N4"],
  ["典型的な", "てんけいてきな", "Typical / Characteristic", "na", "N4"],
  ["例外的な", "れいがいてきな", "Exceptional / Unusual", "na", "N4"],
  ["不安な", "ふあんな", "! Anxious / Worried", "na", "N4"],
  ["安心な", "あんしんな", "! Calm / Reassured", "na", "N4"],
  ["素敵な", "すてきな", "! Nice / Attractive / Cool", "na", "N4"],
  ["変な", "へんな", "! Strange / Odd", "na", "N4"],
  ["ハンサムな", "ハンサムな", "Handsome (male)", "na", "N4"],
  ["ハッピーな", "ハッピーな", "Happy (casual)", "na", "N4"],
  ["ラッキーな", "ラッキーな", "Lucky (casual)", "na", "N4"],
  ["フリーな", "フリーな", "Free / No charge", "na", "N4"],
  ["スムーズな", "スムーズな", "Smooth / Flowing", "na", "N4"],
  ["ポジティブな", "ポジティブな", "Positive", "na", "N4"],
  ["ネガティブな", "ネガティブな", "Negative", "na", "N4"],
  ["オープンな", "オープンな", "Open / Honest", "na", "N4"],
  ["クリエイティブな", "クリエイティブな", "Creative", "na", "N4"],
  ["アクティブな", "アクティブな", "Active / Energetic", "na", "N4"],
  ["フレッシュな", "フレッシュな", "Segar / Baru", "na", "N4"],
  ["ユニークな", "ユニークな", "Unique / Distinctive", "na", "N4"],
  ["大人しな", "おとなしな", "Quiet / Obedient", "na", "N4"],
  ["平凡な", "へいぼんな", "Ordinary / Unremarkable", "na", "N4"],
  ["非凡な", "ひぼんな", "Extraordinary / Unusual", "na", "N4"],
  ["卓越した", "たくえつした", "Outstanding / Excellent", "na", "N4"],
  ["優秀な", "ゆうしゅうな", "Excellent / High-achieving", "na", "N4"],
  ["優れた", "すぐれた", "Superior / Excellent", "na", "N4"],
  ["劣った", "おとった", "Inferior / Below par", "na", "N4"],
  ["公平な", "こうへいな", "! Fair / Impartial", "na", "N4"],
  ["不公平な", "ふこうへいな", "Unfair / Biased", "na", "N4"],
  ["正義な", "せいぎな", "Correct / Fair", "na", "N4"],
  ["誠実な", "せいじつな", "! Honest / Sincere", "na", "N4"],
  ["不誠実な", "ふせいじつな", "Dishonest / Deceitful", "na", "N4"],
  ["謙虚な", "けんきょな", "Humble", "na", "N4"],
  ["傲慢な", "ごうまんな", "Arrogant / Haughty", "na", "N4"],
  ["感謝な", "かんしゃな", "Grateful / Thankful", "na", "N4"],
  ["礼儀正しい", "れいぎただしい", "Polite / Well-mannered", "na", "N4"],
  ["失礼な", "しつれいな", "! Rude / Ill-mannered", "na", "N4"],
  ["無礼な", "ぶれいな", "Very rude / Disrespectful", "na", "N4"],
  ["理性的な", "りせいてきな", "Rational / Reasonable", "na", "N4"],
  ["感情的な", "かんじょうてきな", "Emotional", "na", "N4"],
  ["客観的な", "きゃっかんてきな", "Objective", "na", "N4"],
  ["主観的な", "しゅかんてきな", "Subjective", "na", "N4"],
  ["論理的な", "ろんりてきな", "Logical", "na", "N4"],
  ["感覚的な", "かんかくてきな", "Intuitive / Feeling-based", "na", "N4"],
  ["社交的な", "しゃこうてきな", "Social / Outgoing", "na", "N4"],
  ["内向的な", "ないこうてきな", "Introverted / Shy", "na", "N4"],
  ["外向的な", "がいこうてきな", "Extroverted / Friendly", "na", "N4"],
  ["楽観的な", "らっかんてきな", "Optimistic", "na", "N4"],
  ["悲観的な", "ひかんてきな", "Pessimistic", "na", "N4"],
  ["保守的な", "ほしゅてきな", "Conservative", "na", "N4"],
  ["進歩的な", "しんぽてきな", "Progressive", "na", "N4"],
  ["革新的な", "かくしんてきな", "Innovative / Revolutionary", "na", "N4"],
  ["伝統的な", "でんとうてきな", "Traditional", "na", "N4"],
  ["現代的な", "げんだいてきな", "Modern / Contemporary", "na", "N4"],
  ["古典的な", "こてんてきな", "Classic", "na", "N4"],
  ["国際的な", "こくさいてきな", "International", "na", "N4"],
  ["地域的な", "ちいきてきな", "Local / Regional", "na", "N4"],
  ["個人的な", "こじんてきな", "Personal / Private", "na", "N4"],
  ["公共的な", "こうきょうてきな", "Public / General", "na", "N4"],
  ["社会的な", "しゃかいてきな", "Social", "na", "N4"],
  ["経済的な", "けいざいてきな", "Economical / Frugal", "na", "N4"],
  ["政治的な", "せいじてきな", "Political", "na", "N4"],
  ["文化的な", "ぶんかてきな", "Cultural", "na", "N4"],
  ["教育的な", "きょういくてきな", "Educational", "na", "N4"],
  ["科学的な", "かがくてきな", "Scientific", "na", "N4"],
  ["医学的な", "いがくてきな", "Medical", "na", "N4"],
  ["技術的な", "ぎじゅつてきな", "Technical / Technological", "na", "N4"],
  ["芸術的な", "げいじゅつてきな", "Artistic", "na", "N4"],
  ["音楽的な", "おんがくてきな", "Musical", "na", "N4"],
  ["スポーツ的な", "スポーツてきな", "Sporty", "na", "N4"],
  ["自動的な", "じどうてきな", "Automatic", "na", "N4"],
  ["手動的な", "しゅどうてきな", "Manual", "na", "N4"],
  ["独創的な", "どくそうてきな", "Original / Creative", "na", "N4"],
  ["模倣的な", "もほうてきな", "Imitative / Copying", "na", "N4"],
  ["批判的な", "ひはんてきな", "Critical", "na", "N4"],
  ["建設的な", "けんせつてきな", "Constructive", "na", "N4"],
  ["破壊的な", "はかいてきな", "Destructive", "na", "N4"],
  ["協力的な", "きょうりょくてきな", "Cooperative / Collaborative", "na", "N4"],
  ["非協力的な", "ひきょうりょくてきな", "Uncooperative", "na", "N4"],
  ["依存的な", "いぞんてきな", "Dependent / Reliant", "na", "N4"],
  ["自立的な", "じりつてきな", "Independent / Self-reliant", "na", "N4"],
  ["責任感のある", "せきにんかんのある", "Responsible", "na", "N4"],
  ["無責任な", "むせきにんな", "Irresponsible", "na", "N4"],
  ["信頼できる", "しんらいできる", "Trustworthy / Reliable", "na", "N4"],
  ["信頼できない", "しんらいできない", "Untrustworthy / Unreliable", "na", "N4"],
  ["才能がある", "さいのうがある", "Talented / Gifted", "na", "N4"],
  ["才能のない", "さいのうのない", "Untalented", "na", "N4"],
  ["印象的な", "いんしょうてきな", "Memorable / Impressive", "na", "N4"],
  ["平静な", "へいせいな", "Calm / Undisturbed", "na", "N4"],
  ["激動な", "げきどうな", "Turbulent / Tumultuous", "na", "N4"],
  ["安定した", "あんていした", "Stable", "na", "N4"],
  ["不安定な", "ふあんていな", "Unstable", "na", "N4"],
  ["規則正しい", "きそくただしい", "Orderly / Disciplined", "na", "N4"],
  ["不規則な", "ふきそくな", "Disorderly / Irregular", "na", "N4"],
  ["清潔感のある", "せいけつかんのある", "Clean and tidy impression", "na", "N4"],
  ["高級な", "こうきゅうな", "Luxurious / High-class", "na", "N4"],
  ["低級な", "ていきゅうな", "Low-class / Cheap", "na", "N4"],
  ["シンプルな", "シンプルな", "Simple / Plain", "na", "N4"],
  ["スタイリッシュな", "スタイリッシュな", "Stylish / Fashionable", "na", "N4"],
  ["カジュアルな", "カジュアルな", "Casual / Relaxed", "na", "N4"],
  ["フォーマルな", "フォーマルな", "Formal / Official", "na", "N4"],
  ["ファッショナブルな", "ファッショナブルな", "Fashionable / Stylish", "na", "N4"],
  ["おしゃれな", "おしゃれな", "Stylish / Trendy", "na", "N4"],
  ["無難な", "ぶなんな", "Safe / Inconspicuous", "na", "N4"],
  ["目立つ", "めだつ", "Eye-catching / Stands out", "na", "N4"],
  ["インパクトのある", "インパクトのある", "Impactful / Impressive", "na", "N4"],
  ["気さくな", "きさくな", "Friendly / Easy to talk to", "na", "N4"],
  ["明るい性格の", "あかるいせいかくの", "Cheerful personality", "na", "N4"],
  ["暗い性格の", "くらいせいかくの", "Gloomy personality", "na", "N4"],
  ["なごやかな", "なごやかな", "Peaceful / Harmonious", "na", "N4"],
  ["和気あいあいな", "わきあいあいな", "Friendly atmosphere / Cozy", "na", "N4"],
  ["ぎこちない", "ぎこちない", "Awkward / Stiff", "na", "N4"],
  ["気まぐれな", "きまぐれな", "Changeable / Unpredictable", "na", "N4"],
  ["のんびりした", "のんびりした", "Relaxed / Unhurried", "na", "N4"],
  ["せっかちな", "せっかちな", "Hasty / Impatient", "na", "N4"],
  ["マイペースな", "マイペースな", "Laid-back / At one's own pace", "na", "N4"],
  ["スリムな", "スリムな", "Slim / Slender", "na", "N4"],
  ["ふくよかな", "ふくよかな", "Plump / Full-figured", "na", "N4"],
  ["スポーティーな", "スポーティーな", "Sporty / Athletic", "na", "N4"],
  ["エレガントな", "エレガントな", "Elegant / Graceful", "na", "N4"],
  ["キュートな", "キュートな", "Cute / Adorable", "na", "N4"],
  ["セクシーな", "セクシーな", "Sexy / Attractive", "na", "N4"],
  ["ワイルドな", "ワイルドな", "Wild / Untamed", "na", "N4"],
  ["ナチュラルな", "ナチュラルな", "Natural", "na", "N4"],
  ["ロマンチックな", "ロマンチックな", "Romantic", "na", "N4"],
  ["ドラマチックな", "ドラマチックな", "Dramatic", "na", "N4"],
  ["ダイナミックな", "ダイナミックな", "Dynamic / Energetic", "na", "N4"],
  ["カリスマ的な", "カリスマてきな", "Charismatic", "na", "N4"],
  ["神秘的な", "しんぴてきな", "Mysterious / Mystical", "na", "N4"],
  ["幻想的な", "げんそうてきな", "Fantastic / Imaginative", "na", "N4"],
  ["詩的な", "してきな", "Poetic", "na", "N4"],
  ["哲学的な", "てつがくてきな", "Philosophical", "na", "N4"],
  ["歴史的な", "れきしてきな", "Historic / Historical", "na", "N4"],
  ["伝説的な", "でんせつてきな", "Legendary", "na", "N4"],
  ["象徴的な", "しょうちょうてきな", "Symbolic", "na", "N4"],
  ["革命的な", "かくめいてきな", "Revolutionary", "na", "N4"]
];
const nouns = [["人","ひと","! Person","c1"],["方","かた","! Person (polite)","c1"],["名前","なまえ","! Name","c1"],["友達","ともだち","! Friend","c1"],["家族","かぞく","! Family","c1"],["父","ちち","! Father (own)","c1"],["母","はは","! Mother (own)","c1"],["お父さん","おとうさん","! Father (someone else's)","c1"],["お母さん","おかあさん","! Mother (someone else's)","c1"],["兄","あに","! Older brother (own)","c1"],["姉","あね","! Older sister (own)","c1"],["弟","おとうと","! Younger brother","c1"],["妹","いもうと","! Younger sister","c1"],["子供","こども","! Children / Kids","c1"],["赤ちゃん","あかちゃん","! Baby","c1"],["男の子","おとこのこ","! Boy / Son","c1"],["女の子","おんなのこ","! Girl / Daughter","c1"],["先生","せんせい","! Teacher / Doctor","c1"],["学生","がくせい","! Student","c1"],["生徒","せいと","! Pupil / Student","c1"],["会社員","かいしゃいん","! Employee","c1"],["医者","いしゃ","! Doctor","c1"],["看護師","かんごし","! Nurse","c1"],["店員","てんいん","! Store clerk","c1"],["隣人","りんじん","! Neighbor","c1"],["相手","あいて","! Opponent / Partner","c1"],["客","きゃく","! Guest / Customer","c1"],["上司","じょうし","! Boss / Superior","c1"],["部下","ぶか","! Subordinate","c1"],["同僚","どうりょう","! Coworker / Colleague","c1"],["祖父","そふ","! Grandfather (own)","c1"],["祖母","そぼ","! Grandmother (own)","c1"],["おじいさん","おじいさん","Grandfather (someone else's)","c1"],["おばあさん","おばあさん","Grandmother (someone else's)","c1"],["叔父","おじ","! Uncle","c1"],["叔母","おば","! Aunt","c1"],["兄弟","きょうだい","! Sibling(s)","c1"],["姉妹","しまい","! Sister(s)","c1"],["夫","おっと","! Husband (own)","c1"],["妻","つま","! Wife (own)","c1"],["旦那","だんな","Husband (casual)","c1"],["奥さん","おくさん","Wife (someone else's)","c1"],["親","おや","! Parent(s)","c1"],["息子","むすこ","Boy / Son","c1"],["娘","むすめ","Girl / Daughter","c1"],["孫","まご","Grandchild","c1"],["恋人","こいびと","Lover / Partner","c1"],["彼氏","かれし","Boyfriend","c1"],["知人","ちじん","Acquaintance","c1"],["他人","たにん","Stranger / Other person","c1"],["大人","おとな","! Adult","c1"],["若者","わかもの","Young person / Youth","c1"],["老人","ろうじん","Elderly person / Senior","c1"],["女性","じょせい","Woman (formal)","c1"],["男性","だんせい","Man (formal)","c1"],["警察","けいさつ","Police","c1"],["消防士","しょうぼうし","Firefighter","c1"],["運転手","うんてんしゅ","! Driver / Chauffeur","c1"],["料理人","りょうりにん","Cook / Chef","c1"],["作家","さっか","Writer / Author","c1"],["歌手","かしゅ","Singer","c1"],["俳優","はいゆう","Actor","c1"],["選手","せんしゅ","Athlete / Player","c1"],["政治家","せいじか","Politician","c1"],["日本人","にほんじん","Japanese person","c1"],["外国人","がいこくじん","! Foreigner","c1"],["留学生","りゅうがくせい","International student","c1"],["クラスメート","クラスメート","Classmate","c1"],["同級生","どうきゅうせい","Same-year classmate","c1"],["先輩","せんぱい","Senior / Upperclassman","c1"],["後輩","こうはい","Junior / Underclassman","c1"],["受付","うけつけ","Receptionist / Front desk","c1"],["係","かかり","Staff / Person in charge","c1"],["チームメンバー","チームメンバー","Team member","c1"],["ボランティア","ボランティア","Volunteer","c1"],["主人","しゅじん","Husband (formal/polite)","c1"],["家内","かない","Wife (humble form)","c1"],["双子","ふたご","Twins","c1"],["お兄さん","おにいさん","Older brother (someone else's)","c1"],["お姉さん","おねえさん","Older sister (someone else's)","c1"],["弟さん","おとうとさん","Younger brother (someone else's)","c1"],["妹さん","いもうとさん","Younger sister (someone else's)","c1"],["審判","しんぱん","Referee / Umpire","c1"],["コーチ","コーチ","Coach / Trainer","c1"],["ファン","ファン","Fan / Enthusiast","c1"],["教頭","きょうとう","Vice principal","c1"],["担任","たんにん","Homeroom teacher","c1"],["マネージャー","マネージャー","Manager","c1"],["スタッフ","スタッフ","Staff / Employee","c1"],["インターン","インターン","Intern","c1"],["フリーランス","フリーランス","Freelancer","c1"],["起業家","きぎょうか","Entrepreneur","c1"],["公務員","こうむいん","Civil servant / Government employee","c1"],["弁護士","べんごし","Lawyer / Attorney","c1"],["建築家","けんちくか","Architect","c1"],["エンジニア","エンジニア","Engineer","c1"],["デザイナー","デザイナー","Designer","c1"],["プログラマー","プログラマー","Programmer","c1"],["科学者","かがくしゃ","Scientist","c1"],["研究者","けんきゅうしゃ","Researcher","c1"],["アナウンサー","アナウンサー","Announcer / Host","c1"],["記者","きしゃ","Journalist / Reporter","c1"],["カメラマン","カメラマン","Photographer","c1"],["画家","がか","Painter / Artist","c1"],["彫刻家","ちょうこくか","Sculptor","c1"],["陶芸家","とうげいか","Potter / Ceramicist","c1"],["職人","しょくにん","Craftsman / Expert","c1"],["農家","のうか","Farmer","c1"],["漁師","りょうし","Fisherman","c1"],["大工","だいく","Carpenter","c1"],["美容師","びようし","Hairdresser / Stylist","c1"],["理容師","りようし","Barber","c1"],["薬剤師","やくざいし","Pharmacist","c1"],["歯科医","しかい","Dentist","c1"],["獣医","じゅうい","Veterinarian","c1"],["心理士","しんりし","Psychologist","c1"],["教授","きょうじゅ","Profesor","c1"],["講師","こうし","Lecturer / Instructor","c1"],["外交官","がいこうかん","Diplomat","c1"],["警察官","けいさつかん","Police officer (formal)","c1"],["自衛官","じえいかん","Self-Defense Force member (Japan)","c1"],["シェフ","シェフ","Chef","c1"],["ウェイター","ウェイター","Waiter / Restaurant staff","c1"],["カウンセラー","カウンセラー","Counselor","c1"],["ソーシャルワーカー","ソーシャルワーカー","Social worker","c1"],["パイロット","パイロット","Pilot","c1"],["客室乗務員","きゃくしつじょうむいん","Flight attendant","c1"],["機関士","きかんし","Train driver / Engineer","c1"],["運転士","うんてんし","Train operator / Professional driver","c1"],["船員","せんいん","Sailor / Crew member","c1"],["モデル","モデル","Model","c1"],["インフルエンサー","インフルエンサー","Influencer","c1"],["YouTuber","YouTuber","YouTuber","c1"],["ストリーマー","ストリーマー","Streamer","c1"],["クリエイター","クリエイター","Content creator","c1"],["編集者","へんしゅうしゃ","Editor","c1"],["ライター","ライター","Writer / Author","c1"],["翻訳者","ほんやくしゃ","Translator","c1"],["通訳者","つうやくしゃ","Interpreter / Translator","c1"],["司会者","しかいしゃ","MC / Host","c1"],["俳人","はいじん","Haiku poet","c1"],["小説家","しょうせつか","Novelis","c1"],["漫画家","まんがか","Mangaka / Komikus","c1"],["イラストレーター","イラストレーター","Ilustrator","c1"],["音楽家","おんがくか","Musisi","c1"],["指揮者","しきしゃ","Konduktor","c1"],["ピアニスト","ピアニスト","Pianist","c1"],["ギタリスト","ギタリスト","Guitarist","c1"],["ダンサー","ダンサー","Penari","c1"],["芸人","げいにん","Comedian / Entertainer","c1"],["アイドル","アイドル","Idol","c1"],["タレント","タレント","Celebrity / Talent","c1"],["スポーツ選手","スポーツせんしゅ","Sports athlete","c1"],["監督","かんとく","Director / Coach / Film director","c1"],["投手","とうしゅ","Pitcher (baseball)","c1"],["サッカー選手","サッカーせんしゅ","Soccer player","c1"],["野球選手","やきゅうせんしゅ","Baseball player","c1"],["テニス選手","テニスせんしゅ","Tennis player","c1"],["水泳選手","すいえいせんしゅ","Swimmer","c1"],["柔道家","じゅうどうか","Judoka","c1"],["剣道家","けんどうか","Kendo practitioner","c1"],["空手家","からてか","Karateka","c1"],["相撲取り","すもうとり","Sumo wrestler","c1"],["マラソン選手","マラソンせんしゅ","Marathon runner","c1"],["バスケ選手","バスケせんしゅ","Basketball player","c1"],["ゴルファー","ゴルファー","Golfer","c1"],["スキーヤー","スキーヤー","Skier","c1"],["体操選手","たいそうせんしゅ","Gymnast","c1"],["射手","いて","Archer","c1"],["サイクリスト","サイクリスト","Cyclist","c1"],["今日","きょう","! Today","c3"],["明日","あした","! Tomorrow","c3"],["昨日","きのう","! Yesterday","c3"],["今週","こんしゅう","! This week","c3"],["来週","らいしゅう","! Next week","c3"],["先週","せんしゅう","! Last week","c3"],["今月","こんげつ","! This month","c3"],["来月","らいげつ","! Next month","c3"],["先月","せんげつ","! Last month","c3"],["今年","ことし","! This year","c3"],["来年","らいねん","! Next year","c3"],["去年","きょねん","! Last year","c3"],["朝","あさ","! Morning","c3"],["昼","ひる","! Afternoon / Midday","c3"],["夜","よる","! Night / Evening","c3"],["夕方","ゆうがた","! Late afternoon / Evening","c3"],["午前","ごぜん","! Before noon / AM","c3"],["午後","ごご","! After noon / PM","c3"],["時間","じかん","! Time / Hour","c3"],["分","ふん","! Minute","c3"],["秒","びょう","! Second (time)","c3"],["週末","しゅうまつ","Weekend","c3"],["平日","へいじつ","Weekday / Workday","c3"],["休日","きゅうじつ","Holiday / Day off","c3"],["誕生日","たんじょうび","Birthday","c3"],["春","はる","! Spring","c3"],["夏","なつ","! Summer","c3"],["秋","あき","! Autumn / Fall","c3"],["冬","ふゆ","! Winter","c3"],["時刻","じこく","Specific time","c3"],["期間","きかん","! Period / Time span","c3"],["日程","にってい","Daily schedule / Itinerary","c3"],["予約","よやく","Reservation / Appointment","c3"],["締め切り日","しめきりび","Deadline date","c3"],["月曜日","げつようび","! Monday","c3"],["火曜日","かようび","! Tuesday","c3"],["水曜日","すいようび","! Wednesday","c3"],["木曜日","もくようび","! Thursday","c3"],["金曜日","きんようび","! Friday","c3"],["土曜日","どようび","! Saturday","c3"],["日曜日","にちようび","! Sunday","c3"],["元日","がんじつ","New Year's Day","c3"],["お正月","おしょうがつ","Japanese New Year","c3"],["お盆","おぼん","Obon Festival","c3"],["年末","ねんまつ","End of the year","c3"],["年始","ねんし","Beginning of the year","c3"],["上旬","じょうじゅん","First ten days of the month","c3"],["中旬","ちゅうじゅん","Middle of the month","c3"],["下旬","げじゅん","End of the month","c3"],["当日","とうじつ","That very day","c3"],["翌日","よくじつ","! The next day","c3"],["前日","ぜんじつ","The previous day","c3"],["半年","はんとし","Half a year","c3"],["一月","いちがつ","January","c3"],["二月","にがつ","February","c3"],["三月","さんがつ","March","c3"],["四月","しがつ","April","c3"],["五月","ごがつ","May","c3"],["六月","ろくがつ","June","c3"],["七月","しちがつ","July","c3"],["八月","はちがつ","August","c3"],["九月","くがつ","September","c3"],["十月","じゅうがつ","October","c3"],["十一月","じゅういちがつ","November","c3"],["十二月","じゅうにがつ","December","c3"],["一日","ついたち","1st (date)","c3"],["二日","ふつか","2nd (date)","c3"],["三日","みっか","3rd (date)","c3"],["四日","よっか","4th (date)","c3"],["五日","いつか","5th (date)","c3"],["六日","むいか","6th (date)","c3"],["七日","なのか","7th (date)","c3"],["八日","ようか","8th (date)","c3"],["九日","ここのか","9th (date)","c3"],["十日","とおか","10th (date)","c3"],["二十日","はつか","20th (date)","c3"],["年齢","ねんれい","Age","c3"],["午前中","ごぜんちゅう","! Throughout the morning","c3"],["夕べ","ゆうべ","Last night","c3"],["今夜","こんや","Tonight","c3"],["今晩","こんばん","! Tonight","c3"],["今朝","けさ","! This morning","c3"],["おととい","おととい","Two days ago","c3"],["あさって","あさって","The day after tomorrow","c3"],["先々週","せんせんしゅう","Two weeks ago","c3"],["再来週","さらいしゅう","Two weeks from now","c3"],["先々月","せんせんげつ","Two months ago","c3"],["再来月","さらいげつ","Two months from now","c3"],["今頃","いまごろ","Around this time / About now","c3"],["家","いえ","! House / Home","c4"],["部屋","へや","! Room","c4"],["学校","がっこう","! School","c4"],["大学","だいがく","University","c4"],["会社","かいしゃ","! Company","c4"],["病院","びょういん","! Hospital","c4"],["駅","えき","! Station","c4"],["空港","くうこう","! Airport","c4"],["銀行","ぎんこう","! Bank","c4"],["郵便局","ゆうびんきょく","! Post office","c4"],["図書館","としょかん","! Library","c4"],["公園","こうえん","! Park","c4"],["スーパー","スーパー","! Supermarket","c4"],["デパート","デパート","Department store","c4"],["レストラン","レストラン","! Restaurant","c4"],["ホテル","ホテル","! Hotel","c4"],["神社","じんじゃ","! Shinto shrine","c4"],["お寺","おてら","! Buddhist temple","c4"],["博物館","はくぶつかん","! Museum","c4"],["美術館","びじゅつかん","! Art gallery","c4"],["交差点","こうさてん","! Intersection / Crossroads","c4"],["橋","はし","! Bridge","c4"],["道","みち","! Road / Street","c4"],["近所","きんじょ","Neighborhood / Surrounding area","c4"],["海外","かいがい","Overseas / Abroad","c4"],["町","まち","! Town / Small city","c4"],["村","むら","Village","c4"],["都市","とし","Major city / Metropolis","c4"],["都会","とかい","Urban area / City","c4"],["田舎","いなか","Rural area / Countryside","c4"],["国","くに","! Country / Homeland","c4"],["県","けん","Prefecture","c4"],["地域","ちいき","Area / Region","c4"],["地方","ちほう","Region / Province","c4"],["東京","とうきょう","Tokyo","c4"],["大阪","おおさか","Osaka","c4"],["京都","きょうと","Kyoto","c4"],["工場","こうじょう","! Factory","c4"],["事務所","じむしょ","Office","c4"],["研究所","けんきゅうじょ","Research laboratory","c4"],["警察署","けいさつしょ","! Police station","c4"],["消防署","しょうぼうしょ","! Fire station","c4"],["区役所","くやくしょ","Local government office","c4"],["市役所","しやくしょ","! City hall","c4"],["薬局","やっきょく","Pharmacy","c4"],["美容院","びよういん","Beauty salon / Hair salon","c4"],["理髪店","りはつてん","Barbershop","c4"],["コンビニ","コンビニ","Convenience store","c4"],["ショッピングモール","ショッピングモール","Mall / Shopping center","c4"],["遊園地","ゆうえんち","! Playground","c4"],["動物園","どうぶつえん","! Zoo","c4"],["水族館","すいぞくかん","Aquarium","c4"],["映画館","えいがかん","Cinema / Movie theater","c4"],["体育館","たいいくかん","Gimnasium / Aula olahraga","c4"],["プール","プール","Swimming pool","c4"],["グラウンド","グラウンド","Sports field / Ground","c4"],["港","みなと","! Harbor / Port","c4"],["川辺","かわべ","Riverbank","c4"],["海岸","かいがん","! Beach / Coast","c4"],["山頂","さんちょう","Mountaintop / Summit","c4"],["バス停","バスてい","! Bus stop","c4"],["道路","どうろ","! Highway / Main road","c4"],["歩道","ほどう","Sidewalk / Pavement","c4"],["車道","しゃどう","Vehicle lane / Roadway","c4"],["線路","せんろ","Railway tracks","c4"],["踏切","ふみきり","Railroad crossing","c4"],["駅前","えきまえ","In front of the station","c4"],["建物","たてもの","Building","c4"],["アパート","アパート","Apartment","c4"],["マンション","マンション","Kondominium","c4"],["一軒家","いっけんや","Single-family house","c4"],["屋上","おくじょう","Rooftop","c4"],["地下","ちか","Underground / Basement","c4"],["商店街","しょうてんがい","Shopping district","c4"],["スタジアム","スタジアム","Stadion","c4"],["キャンプ場","キャンプじょう","Camping area / Campsite","c4"],["牧場","ぼくじょう","Farm / Pasture","c4"],["農場","のうじょう","! Farmland / Agricultural land","c4"],["市場","いちば","Traditional market","c4"],["花屋","はなや","Flower shop","c4"],["本屋","ほんや","Bookstore","c4"],["肉屋","にくや","Butcher shop","c4"],["魚屋","さかなや","Fish shop","c4"],["パン屋","パンや","Bakery","c4"],["酒屋","さかや","Liquor store","c4"],["文房具屋","ぶんぼうぐや","Stationery store","c4"],["電気屋","でんきや","Electronics store","c4"],["居酒屋","いざかや","Izakaya / Japanese bar","c4"],["喫茶店","きっさてん","Coffee shop","c4"],["食堂","しょくどう","Cafeteria / Canteen","c4"],["屋台","やたい","Street food stall / Cart","c4"],["横断歩道","おうだんほどう","Crosswalk / Zebra crossing","c4"],["トンネル","トンネル","Tunnel","c4"],["改札","かいさつ","Ticket gate","c4"],["カフェ","カフェ","Cafe","c4"],["予約席","よやくせき","Reserved seat","c4"],["禁煙席","きんえんせき","Non-smoking seat","c4"],["喫煙席","きつえんせき","Smoking seat","c4"],["窓際の席","まどぎわのせき","Window seat","c4"],["テラス席","テラスせき","Terrace seat","c4"],["カウンター席","カウンターせき","Counter seat","c4"],["試着室","しちゃくしつ","Fitting room","c4"],["アウトレット","アウトレット","Outlet","c4"],["フリマ","フリマ","Flea market","c4"],["ご飯","ごはん","! Rice / Meal","c5"],["パン","パン","! Roti","c5"],["麺","めん","Noodles","c5"],["肉","にく","! Meat","c5"],["魚","さかな","! Fish","c5"],["野菜","やさい","! Vegetables","c5"],["果物","くだもの","! Fruits","c5"],["卵","たまご","! Egg","c5"],["豆腐","とうふ","! Tofu","c5"],["塩","しお","! Salt","c5"],["砂糖","さとう","! Sugar","c5"],["醤油","しょうゆ","! Soy sauce","c5"],["水","みず","! Water","c5"],["お茶","おちゃ","! Teh","c5"],["コーヒー","コーヒー","! Coffee","c5"],["ジュース","ジュース","! Jus","c5"],["ビール","ビール","! Beer","c5"],["お酒","おさけ","Alcoholic drink / Sake","c5"],["牛乳","ぎゅうにゅう","! Milk","c5"],["朝ごはん","あさごはん","! Breakfast","c5"],["昼ごはん","ひるごはん","! Lunch","c5"],["晩ごはん","ばんごはん","! Dinner","c5"],["お菓子","おかし","! Snack / Sweets","c5"],["弁当","べんとう","Bento / Packed lunch","c5"],["味","あじ","Taste / Flavor","c5"],["料理","りょうり","! Cooking / Cuisine","c5"],["メニュー","メニュー","Menu","c5"],["箸","はし","! Chopsticks","c5"],["皿","さら","! Plate / Dish","c5"],["茶碗","ちゃわん","! Rice bowl","c5"],["寿司","すし","! Sushi","c5"],["刺身","さしみ","! Sashimi","c5"],["天ぷら","てんぷら","Tempura","c5"],["ラーメン","ラーメン","! Ramen","c5"],["うどん","うどん","! Udon","c5"],["そば","そば","! Soba","c5"],["おにぎり","おにぎり","Onigiri","c5"],["たこ焼き","たこやき","Takoyaki","c5"],["焼き肉","やきにく","Yakiniku","c5"],["カレー","カレー","! Curry","c5"],["ハンバーガー","ハンバーガー","Hamburger","c5"],["ピザ","ピザ","Pizza","c5"],["サラダ","サラダ","Salad","c5"],["スープ","スープ","Soup","c5"],["味噌汁","みそしる","! Miso soup","c5"],["定食","ていしょく","Set meal (rice + side dish)","c5"],["おかず","おかず","Side dish","c5"],["漬物","つけもの","! Japanese pickles","c5"],["納豆","なっとう","! Natto (fermented soybeans)","c5"],["豚肉","ぶたにく","Pork","c5"],["牛肉","ぎゅうにく","Beef","c5"],["鶏肉","とりにく","Chicken meat","c5"],["エビ","エビ","Shrimp / Prawn","c5"],["イカ","イカ","Squid","c5"],["タコ","タコ","Octopus","c5"],["りんご","りんご","! Apple","c5"],["バナナ","バナナ","! Banana","c5"],["いちご","いちご","! Strawberry","c5"],["みかん","みかん","! Mandarin orange","c5"],["ぶどう","ぶどう","Grapes","c5"],["にんじん","にんじん","! Carrot","c5"],["玉ねぎ","たまねぎ","Onion","c5"],["じゃがいも","じゃがいも","Potato","c5"],["きゅうり","きゅうり","Cucumber","c5"],["トマト","トマト","! Tomato","c5"],["ほうれん草","ほうれんそう","Spinach","c5"],["キャベツ","キャベツ","Cabbage","c5"],["チーズ","チーズ","Cheese","c5"],["バター","バター","Butter","c5"],["ケーキ","ケーキ","! Cake","c5"],["アイスクリーム","アイスクリーム","! Ice cream","c5"],["チョコレート","チョコレート","Chocolate","c5"],["クッキー","クッキー","Cookie","c5"],["緑茶","りょくちゃ","Green tea","c5"],["紅茶","こうちゃ","Black tea","c5"],["炭酸水","たんさんすい","Sparkling water / Carbonated water","c5"],["ワイン","ワイン","Wine","c5"],["油","あぶら","Oil","c5"],["酢","す","Vinegar","c5"],["みそ","みそ","Miso (soybean paste)","c5"],["コンビニ弁当","コンビニべんとう","Convenience store bento","c5"],["丼","どんぶり","Rice in a large bowl","c5"],["お好み焼き","おこのみやき","Okonomiyaki","c5"],["餃子","ぎょうざ","Gyoza / Pan-fried dumplings","c5"],["焼きそば","やきそば","Japanese fried noodles","c5"],["冷やし中華","ひやしちゅうか","Cold Chinese-style noodles","c5"],["味噌","みそ","Fermented soybean paste","c5"],["ポテトチップス","ポテトチップス","Potato chips","c5"],["グラス","グラス","! Gelas (kaca)","c5"],["コップ","コップ","! Cup / Glass","c5"],["スプーン","スプーン","! Sendok","c5"],["フォーク","フォーク","! Garpu","c5"],["ナイフ","ナイフ","Dinner knife","c5"],["お椀","おわん","Soup bowl","c5"],["どんぶり","どんぶり","Large bowl","c5"],["ランチ","ランチ","Lunch","c5"],["ディナー","ディナー","Dinner","c5"],["鍋","なべ","! Pot / Hot pot","c5"],["おでん","おでん","Oden (Japanese hot pot)","c5"],["焼き魚","やきざかな","Grilled fish","c5"],["煮物","にもの","Boiled food","c5"],["揚げ物","あげもの","Fried food","c5"],["生野菜","なまやさい","Raw vegetables / Salad","c5"],["デザート","デザート","Dessert","c5"],["おつまみ","おつまみ","Snack (with drinks)","c5"],["調味料","ちょうみりょう","Bumbu / Penyedap","c5"],["胡椒","こしょう","Merica / Lada","c5"],["みりん","みりん","Mirin (Japanese sweet cooking sake)","c5"],["だし","だし","Broth / Stock (dashi)","c5"],["海苔","のり","! Nori / Seaweed","c5"],["豆","まめ","Beans / Legumes","c5"],["きのこ","きのこ","Mushroom","c5"],["ごぼう","ごぼう","Burdock root","c5"],["大根","だいこん","White radish / Daikon","c5"],["長ネギ","ながネギ","Green onion / Leek","c5"],["しょうが","しょうが","Ginger","c5"],["にんにく","にんにく","Garlic","c5"],["唐辛子","とうがらし","Chili pepper","c5"],["タンパク質","タンパクしつ","Protein","c5"],["炭水化物","たんすいかぶつ","Carbohydrate","c5"],["脂肪","しぼう","Fat","c5"],["朝食","ちょうしょく","Breakfast (formal)","c5"],["昼食","ちゅうしょく","Lunch (formal)","c5"],["夕食","ゆうしょく","Dinner (formal)","c5"],["空腹","くうふく","Hungry / Starving","c5"],["満腹","まんぷく","Full (after eating)","c5"],["食後","しょくご","After eating","c5"],["食前","しょくぜん","Let's eat / Before eating","c5"],["手料理","てりょうり","Home cooking","c5"],["外食","がいしょく","Eating out","c5"],["コンビニ飯","コンビニめし","Convenience store meal","c5"],["ファストフード","ファストフード","Fast food","c5"],["テイクアウト","テイクアウト","Takeout / Takeaway","c5"],["デリバリー","デリバリー","Delivery","c5"],["賞味期限","しょうみきげん","Expiration date (food)","c5"],["消費期限","しょうひきげん","Best-by date / Expiry","c5"],["原材料","げんざいりょう","Raw material / Ingredient","c5"],["添加物","てんかぶつ","Food additive / Preservative","c5"],["産地","さんち","Country of origin / Place of production","c5"],["国産","こくさん","Domestic product","c5"],["輸入品","ゆにゅうひん","Imported product","c5"],["有機野菜","ゆうきやさい","Organic vegetables","c5"],["健康食品","けんこうしょくひん","Health food","c5"],["スポーツ飲料","スポーツいんりょう","Sports drink","c5"],["エナジードリンク","エナジードリンク","Energy drink","c5"],["アイスコーヒー","アイスコーヒー","Iced coffee","c5"],["ホットコーヒー","ホットコーヒー","Hot coffee","c5"],["カフェラテ","カフェラテ","Cafe latte","c5"],["カプチーノ","カプチーノ","Cappuccino","c5"],["エスプレッソ","エスプレッソ","Espresso","c5"],["抹茶","まっちゃ","Matcha","c5"],["ほうじ茶","ほうじちゃ","Hojicha (roasted green tea)","c5"],["麦茶","むぎちゃ","Barley tea","c5"],["ハーブティー","ハーブティー","Herbal tea","c5"],["玄関","げんかん","! Entryway / Front entrance","c6"],["台所","だいどころ","! Kitchen","c6"],["風呂","ふろ","Bathroom / Bath","c6"],["トイレ","トイレ","! Toilet","c6"],["窓","まど","! Window","c6"],["ドア","ドア","! Door","c6"],["電気","でんき","! Electricity / Light","c6"],["鍵","かぎ","! Key / Lock","c6"],["机","つくえ","! Desk / Study table","c6"],["椅子","いす","! Chair","c6"],["ベッド","ベッド","! Bed","c6"],["テーブル","テーブル","Dining table","c6"],["冷蔵庫","れいぞうこ","Refrigerator","c6"],["洗濯機","せんたくき","Washing machine","c6"],["エアコン","エアコン","AC","c6"],["テレビ","テレビ","! Television / TV","c6"],["電話","でんわ","! Telephone","c6"],["携帯","けいたい","! Mobile phone / Cell phone","c6"],["パソコン","パソコン","! Computer","c6"],["ゴミ","ゴミ","! Garbage / Trash","c6"],["荷物","にもつ","! Luggage / Baggage","c6"],["財布","さいふ","! Wallet","c6"],["かばん","かばん","! Bag","c6"],["傘","かさ","! Umbrella","c6"],["廊下","ろうか","Hallway / Corridor","c6"],["階段","かいだん","Stairs","c6"],["屋根","やね","Roof","c6"],["壁","かべ","Wall","c6"],["床","ゆか","Floor","c6"],["天井","てんじょう","Ceiling","c6"],["戸","と","Sliding door","c6"],["引き出し","ひきだし","Drawer","c6"],["棚","たな","Shelf / Rack","c6"],["押し入れ","おしいれ","Japanese built-in closet","c6"],["布団","ふとん","Futon / Foldable mattress","c6"],["枕","まくら","Pillow / Cushion","c6"],["毛布","もうふ","Blanket","c6"],["シーツ","シーツ","Bed sheet","c6"],["ソファー","ソファー","Sofa","c6"],["照明","しょうめい","Light / Lighting","c6"],["扇風機","せんぷうき","Electric fan","c6"],["暖房","だんぼう","Room heater / Heating","c6"],["電子レンジ","でんしレンジ","Microwave","c6"],["炊飯器","すいはんき","Rice cooker","c6"],["食器洗い機","しょっきあらいき","Dishwasher","c6"],["掃除機","そうじき","Penyedot debu","c6"],["アイロン","アイロン","Iron (clothes)","c6"],["ドライヤー","ドライヤー","Hair dryer","c6"],["石鹸","せっけん","Soap","c6"],["シャンプー","シャンプー","Shampoo","c6"],["タオル","タオル","Towel","c6"],["鏡","かがみ","Mirror","c6"],["歯ブラシ","はブラシ","Toothbrush","c6"],["歯磨き粉","はみがきこ","Toothpaste","c6"],["トイレットペーパー","トイレットペーパー","Toilet paper","c6"],["ティッシュ","ティッシュ","Tissue","c6"],["ほうき","ほうき","Broom","c6"],["雑巾","ぞうきん","Mop / Cleaning cloth","c6"],["洗剤","せんざい","Detergent","c6"],["電球","でんきゅう","Light bulb","c6"],["コンセント","コンセント","Power outlet / Socket","c6"],["ポスト","ポスト","Mailbox / Post box","c6"],["ゴミ箱","ゴミばこ","Trash can / Waste bin","c6"],["植木","うえき","Potted plant / Garden tree","c6"],["庭","にわ","Garden / Yard","c6"],["ベランダ","ベランダ","Balcony / Terrace","c6"],["新聞","しんぶん","! Newspaper","c6"],["雑誌","ざっし","! Magazine","c6"],["時計","とけい","! Clock / Watch","c6"],["目覚まし時計","めざましどけい","Alarm clock","c6"],["カレンダー","カレンダー","Calendar","c6"],["電池","でんち","Battery","c6"],["はさみ","はさみ","Scissors","c6"],["テープ","テープ","Tape","c6"],["ノリ","ノリ","Glue","c6"],["鉛筆削り","えんぴつけずり","Pencil sharpener","c6"],["花瓶","かびん","Flower vase","c6"],["和室","わしつ","Japanese-style room","c6"],["洋室","ようしつ","Western-style room","c6"],["畳","たたみ","Tatami (straw floor mat)","c6"],["障子","しょうじ","Paper sliding door","c6"],["ガス","ガス","Gas","c6"],["水道","すいどう","Tap water","c6"],["電気代","でんきだい","Electricity bill","c6"],["ガス代","ガスだい","Gas bill","c6"],["ゴミ袋","ゴミぶくろ","Garbage bag","c6"],["ゴミ捨て場","ゴミすてば","Garbage disposal area","c6"],["引っ越し","ひっこし","Moving house / Relocation","c6"],["敷金","しきん","Security deposit (rental)","c6"],["礼金","れいきん","Key money / Gratitude money (rental)","c6"],["管理費","かんりひ","Building management fee","c6"],["スマホ","スマホ","Smartphone","c6"],["タブレット","タブレット","Tablet","c6"],["スピーカー","スピーカー","Speaker","c6"],["イヤホン","イヤホン","Earphone","c6"],["カメラ","カメラ","! Camera","c6"],["プリンター","プリンター","Printer","c6"],["ルーター","ルーター","Router","c6"],["ケーブル","ケーブル","Cable / Wire","c6"],["充電器","じゅうでんき","Charger / Power adapter","c6"],["マウス","マウス","Computer mouse","c6"],["キーボード","キーボード","Keyboard","c6"],["モニター","モニター","Monitor / Screen","c6"],["ヘッドフォン","ヘッドフォン","Headphone","c6"],["アプリ","アプリ","App / Application","c6"],["パスワード","パスワード","Password","c6"],["電車","でんしゃ","! Electric train","c7"],["バス","バス","! Bus","c7"],["タクシー","タクシー","! Taxi","c7"],["車","くるま","! Car","c7"],["自転車","じてんしゃ","! Bicycle","c7"],["バイク","バイク","Motorcycle","c7"],["飛行機","ひこうき","! Airplane","c7"],["船","ふね","! Ship / Boat","c7"],["地下鉄","ちかてつ","! Subway / Underground train","c7"],["新幹線","しんかんせん","! Shinkansen","c7"],["駐車場","ちゅうしゃじょう","! Parking lot","c7"],["信号","しんごう","! Traffic light","c7"],["地図","ちず","! Map","c7"],["切符","きっぷ","Ticket","c7"],["定期券","ていきけん","Commuter pass / Season ticket","c7"],["出口","でぐち","Exit","c7"],["入口","いりぐち","Entrance","c7"],["乗り場","のりば","Boarding area / Bus stop","c7"],["急行","きゅうこう","Express train","c7"],["特急","とっきゅう","Limited express train","c7"],["普通列車","ふつうれっしゃ","Local train","c7"],["始発","しはつ","First train","c7"],["終電","しゅうでん","Last train","c7"],["乗り換え","のりかえ","! Transfer / Change trains","c7"],["時刻表","じこくひょう","Train / Bus timetable","c7"],["運賃","うんちん","Fare / Transportation fee","c7"],["ICカード","ICカード","IC card (transit)","c7"],["ホーム","ホーム","Train platform","c7"],["路線","ろせん","Line / Route","c7"],["方向","ほうこう","Direction","c7"],["上り","のぼり","Inbound / Toward city","c7"],["下り","くだり","Outbound / Away from city","c7"],["渋滞","じゅうたい","Traffic jam","c7"],["事故","じこ","Accident","c7"],["ガソリン","ガソリン","Gasoline / Petrol","c7"],["ガソリンスタンド","ガソリンスタンド","Gas station","c7"],["免許証","めんきょしょう","Driver's license","c7"],["スピード","スピード","Speed","c7"],["タクシー乗り場","タクシーのりば","Taxi stand","c7"],["バスターミナル","バスターミナル","Bus terminal","c7"],["自動改札","じどうかいさつ","Automatic ticket gate","c7"],["エスカレーター","エスカレーター","Escalator","c7"],["エレベーター","エレベーター","Elevator / Lift","c7"],["スクーター","スクーター","Scooter","c7"],["交通","こうつう","! Traffic / Transportation","c7"],["高速道路","こうそくどうろ","Expressway / Toll road","c7"],["頭","あたま","! Head","c2"],["顔","かお","! Face","c2"],["目","め","! Eye","c2"],["耳","みみ","! Ear","c2"],["鼻","はな","! Nose","c2"],["口","くち","! Mouth","c2"],["歯","は","! Tooth / Teeth","c2"],["舌","した","! Tongue","c2"],["首","くび","! Neck","c2"],["肩","かた","! Shoulder","c2"],["胸","むね","! Chest","c2"],["腹","はら","! Stomach / Belly","c2"],["背中","せなか","! Punggung","c2"],["腰","こし","! Pinggang","c2"],["手","て","! Hand / Arm","c2"],["指","ゆび","! Finger","c2"],["爪","つめ","! Nail / Claw","c2"],["足","あし","! Foot / Leg","c2"],["膝","ひざ","Knee","c2"],["髪","かみ","Hair","c2"],["皮膚","ひふ","! Skin","c2"],["骨","ほね","! Bone","c2"],["心臓","しんぞう","! Heart","c2"],["額","ひたい","Forehead","c2"],["まつげ","まつげ","Bulu mata","c2"],["まゆ毛","まゆげ","Eyebrow","c2"],["ほお","ほお","Cheek","c2"],["あご","あご","Chin / Jaw","c2"],["唇","くちびる","Lip","c2"],["のど","のど","Throat","c2"],["脇","わき","Armpit","c2"],["肘","ひじ","Elbow","c2"],["手首","てくび","Wrist","c2"],["拳","こぶし","Fist","c2"],["太もも","ふともも","Thigh","c2"],["足首","あしくび","Ankle","c2"],["かかと","かかと","Heel","c2"],["つま先","つまさき","Ujung jari kaki","c2"],["肺","はい","! Lungs","c2"],["胃","い","! Stomach","c2"],["腸","ちょう","Intestines","c2"],["肝臓","かんぞう","Liver","c2"],["腎臓","じんぞう","Kidney","c2"],["脳","のう","! Brain","c2"],["血","ち","! Blood","c2"],["神経","しんけい","Nerve","c2"],["筋肉","きんにく","! Muscle","c2"],["体","からだ","! Body","c2"],["おなか","おなか","Belly (conversation)","c2"],["背","せ","Height / Back (body)","c2"],["汗","あせ","! Sweat / Perspiration","c2"],["涙","なみだ","! Tear(s)","c2"],["笑顔","えがお","Smile","c2"],["声帯","せいたい","Pita suara","c2"],["気分","きぶん","Feeling / Physical condition","c2"],["体調","たいちょう","Physical condition / Health status","c2"],["健康","けんこう","! Health","c2"],["呼吸","こきゅう","Breathing / Respiration","c2"],["消化","しょうか","Digestion","c2"],["循環","じゅんかん","Blood circulation","c2"],["山","やま","! Mountain","c8"],["川","かわ","! River","c8"],["海","うみ","! Sea / Ocean","c8"],["空","そら","! Sky","c8"],["太陽","たいよう","! Sun","c8"],["月","つき","! Month","c8"],["星","ほし","! Star","c8"],["雨","あめ","! Rain","c8"],["雪","ゆき","! Snow","c8"],["風","かぜ","! Wind","c8"],["雲","くも","! Cloud","c8"],["天気","てんき","! Weather","c8"],["気温","きおん","! Air temperature","c8"],["花","はな","! Flower","c8"],["木","き","! Tree","c8"],["草","くさ","! Rumput","c8"],["森","もり","! Forest","c8"],["池","いけ","! Pond","c8"],["島","しま","! Pulau","c8"],["地震","じしん","! Gempa bumi","c8"],["台風","たいふう","! Typhoon","c8"],["動物","どうぶつ","Animal","c8"],["犬","いぬ","Dog","c8"],["猫","ねこ","Cat","c8"],["鳥","とり","Bird","c8"],["虫","むし","Insect / Bug","c8"],["湖","みずうみ","! Lake","c8"],["滝","たき","! Waterfall","c8"],["砂漠","さばく","! Desert","c8"],["平野","へいや","Lowland / Plain","c8"],["丘","おか","Hill","c8"],["岩","いわ","Rock / Boulder","c8"],["砂","すな","! Sand","c8"],["土","つち","! Soil / Earth","c8"],["泥","どろ","Mud","c8"],["霧","きり","Fog / Mist","c8"],["霜","しも","Frost","c8"],["氷","こおり","Es","c8"],["雷","かみなり","Thunder / Lightning","c8"],["虹","にじ","Rainbow","c8"],["日差し","ひざし","Sunlight","c8"],["日陰","ひかげ","Shady spot","c8"],["湿気","しっけ","Humidity / Moisture","c8"],["気候","きこう","Climate","c8"],["環境","かんきょう","! Environment","c8"],["自然","しぜん","! Nature","c8"],["熊","くま","Bear","c8"],["うさぎ","うさぎ","Rabbit","c8"],["サル","サル","Monkey","c8"],["キツネ","キツネ","Fox","c8"],["オオカミ","オオカミ","Wolf","c8"],["ライオン","ライオン","Lion","c8"],["ゾウ","ゾウ","Elephant","c8"],["キリン","キリン","Giraffe","c8"],["カバ","カバ","Hippopotamus","c8"],["ペンギン","ペンギン","Penguin","c8"],["イルカ","イルカ","Dolphin","c8"],["クジラ","クジラ","Whale","c8"],["カメ","カメ","Turtle","c8"],["ヘビ","ヘビ","Snake","c8"],["カエル","カエル","Frog","c8"],["チョウ","チョウ","Butterfly","c8"],["蚊","か","Mosquito","c8"],["アリ","アリ","Ant","c8"],["桜","さくら","Cherry blossom","c8"],["紅葉","もみじ","Autumn red leaves","c8"],["竹","たけ","Bamboo","c8"],["松","まつ","Pine tree","c8"],["米","こめ","Padi / Beras","c8"],["牛","うし","Cow / Beef","c8"],["馬","うま","Horse","c8"],["豚","ぶた","Pig","c8"],["羊","ひつじ","Sheep","c8"],["鶏","にわとり","Chicken","c8"],["鳩","はと","Pigeon / Dove","c8"],["鹿","しか","Deer","c8"],["狸","たぬき","Raccoon dog / Tanuki","c8"],["カラス","カラス","Crow / Raven","c8"],["スズメ","スズメ","Sparrow","c8"],["ハト","ハト","Pigeon / Dove","c8"],["クモ","クモ","Spider","c8"],["バッタ","バッタ","Grasshopper","c8"],["ホタル","ホタル","Firefly","c8"],["空気","くうき","! Air","c8"],["地球","ちきゅう","Earth / Globe","c8"],["宇宙","うちゅう","Outer space","c8"],["大地","だいち","Land / Earth","c8"],["火山","かざん","! Volcano","c8"],["湾","わん","Bay / Gulf","c8"],["岬","みさき","Cape / Headland","c8"],["草原","そうげん","Grassland / Meadow","c8"],["林","はやし","Small forest / Grove","c8"],["葉","は","Leaf","c8"],["枝","えだ","Branch / Twig","c8"],["根","ね","Root","c8"],["種","たね","Seed","c8"],["天然","てんねん","Natural","c8"],["洪水","こうずい","! Flood","c8"],["噴火","ふんか","Volcanic eruption","c8"],["津波","つなみ","Tsunami","c8"],["竜巻","たつまき","Tornado / Puting beliung","c8"],["落雷","らくらい","Lightning strike","c8"],["露","つゆ","Dew","c8"],["湿地","しっち","Swamp / Wetland","c8"],["波","なみ","Ombak / Gelombang","c8"],["潮","しお","Tide / Seawater","c8"],["珊瑚","さんご","Karang / Koral","c8"],["バラ","バラ","Mawar","c8"],["梅","うめ","Plum blossom","c8"],["葉っぱ","はっぱ","Leaf","c8"],["象","ぞう","Elephant","c8"],["虎","とら","Tiger","c8"],["ネズミ","ネズミ","Tikus","c8"],["へび","へび","Snake","c8"],["タヌキ","タヌキ","Raccoon dog / Tanuki","c8"],["サメ","サメ","Hiu","c8"],["インコ","インコ","Parrot / Parakeet","c8"],["星座","せいざ","Constellation","c8"],["惑星","わくせい","Planet","c8"],["銀河","ぎんが","Galaksi","c8"],["月面","げつめん","Surface of the moon","c8"],["火星","かせい","Planet Mars","c8"],["土星","どせい","Saturn","c8"],["太陽光","たいようこう","Sunlight / Solar energy","c8"],["森林","しんりん","Dense forest / Jungle","c8"],["砂浜","すなはま","Sandy beach","c8"],["干潟","ひがた","Tidal flat","c8"],["沼","ぬま","Marsh / Swamp","c8"],["渓谷","けいこく","Valley / Gorge","c8"],["崖","がけ","Cliff","c8"],["盆地","ぼんち","Basin / Valley","c8"],["高原","こうげん","Highland / Plateau","c8"],["半島","はんとう","Peninsula","c8"],["海峡","かいきょう","Strait / Channel","c8"],["大陸","たいりく","Continent","c8"],["大西洋","たいせいよう","Atlantic Ocean","c8"],["太平洋","たいへいよう","Pacific Ocean","c8"],["インド洋","インドよう","Indian Ocean","c8"],["北極","ほっきょく","North Pole / Arctic","c8"],["南極","なんきょく","South Pole / Antarctic","c8"],["濃霧","のうむ","Dense fog / Thick mist","c8"],["霙","みぞれ","Sleet / Hail","c8"],["吹雪","ふぶき","Blizzard / Snowstorm","c8"],["稲光","いなびかり","Lightning / Flash","c8"],["嵐","あらし","Storm / Typhoon","c8"],["旋風","せんぷう","Whirlwind / Gust","c8"],["湿度","しつど","! Humidity","c8"],["気圧","きあつ","Air pressure","c8"],["紫外線","しがいせん","Ultraviolet rays / UV","c8"],["一つ","ひとつ","One (objects)","c9"],["二つ","ふたつ","Two (objects)","c9"],["三つ","みっつ","Three (objects)","c9"],["四つ","よっつ","Four (objects)","c9"],["五つ","いつつ","Five (objects)","c9"],["枚","まい","Counter for flat things (paper/clothes)","c9"],["本","ほん","! Long thin counter (for sticks/bottles)","c9"],["冊","さつ","Counter for bound volumes (books)","c9"],["台","だい","Counter for machines/vehicles","c9"],["匹","ひき","Counter for small animals","c9"],["杯","はい","Cup / Glass","c9"],["回","かい","Times / Rounds","c9"],["番","ばん","Order number / Sequence number","c9"],["階","かい","Floor (of a building)","c9"],["個","こ","Counter for small round objects","c9"],["歳","さい","Years old","c9"],["円","えん","Yen","c9"],["キロ","キロ","Kilogram / Kilometer","c9"],["六つ","むっつ","Six (objects)","c9"],["七つ","ななつ","Seven (objects)","c9"],["八つ","やっつ","Eight (objects)","c9"],["九つ","ここのつ","Nine (objects)","c9"],["十","じゅう","Ten","c9"],["百","ひゃく","One hundred","c9"],["千","せん","One thousand","c9"],["万","まん","Ten thousand","c9"],["億","おく","One hundred million","c9"],["着","ちゃく","Counter for sets of clothing","c9"],["軒","けん","Unit (house/shop)","c9"],["羽","わ","Counter for birds/small animals","c9"],["通","つう","Counter for letters/documents","c9"],["点","てん","Points / Counter for exam questions","c9"],["倍","ばい","Times / Fold (multiplier)","c9"],["半分","はんぶん","Half","c9"],["割","わり","One-tenth / 10%","c9"],["程度","ていど","Level / About","c9"],["零","ぜろ","Zero","c9"],["一","いち","One","c9"],["二","に","Two","c9"],["三","さん","Three","c9"],["四","し／よん","Four","c9"],["五","ご","Five","c9"],["六","ろく","Six","c9"],["七","しち／なな","Seven","c9"],["八","はち","Eight","c9"],["九","く／きゅう","Nine","c9"],["十一","じゅういち","Eleven","c9"],["十二","じゅうに","Twelve","c9"],["二十","にじゅう","Twenty","c9"],["三十","さんじゅう","Thirty","c9"],["百万","ひゃくまん","One million","c9"],["一兆","いっちょう","One trillion","c9"],["何","なん","How many / What (in counting)","c9"],["分の","ぶんの","Per ~ / Divisor (fraction)","c9"],["パーセント","パーセント","Percent","c9"],["キログラム","キログラム","Kilogram","c9"],["センチ","センチ","Centimeter","c9"],["メートル","メートル","Meter","c9"],["キロメートル","キロメートル","Kilometer","c9"],["リットル","リットル","Liter","c9"],["グラム","グラム","Gram","c9"],["授業","じゅぎょう","! Lesson / Class","c10"],["宿題","しゅくだい","! Homework","c10"],["試験","しけん","! Exam / Test","c10"],["成績","せいせき","! Grade / Report card","c10"],["教科書","きょうかしょ","! Textbook","c10"],["ノート","ノート","! Notebook","c10"],["鉛筆","えんぴつ","! Pencil","c10"],["消しゴム","けしゴム","! Eraser","c10"],["辞書","じしょ","! Dictionary","c10"],["仕事","しごと","Work / Job","c10"],["会議","かいぎ","Meeting","c10"],["締め切り","しめきり","! Deadline","c10"],["給料","きゅうりょう","Salary / Wage","c10"],["残業","ざんぎょう","Overtime","c10"],["休暇","きゅうか","Leave / Vacation","c10"],["出張","しゅっちょう","Business trip","c10"],["部長","ぶちょう","Department head / Manager","c10"],["社長","しゃちょう","Company president / CEO","c10"],["専門","せんもん","Specialty / Expertise","c10"],["アルバイト","アルバイト","Part-time job","c10"],["入学","にゅうがく","! To enter school","c10"],["卒業","そつぎょう","! Graduation","c10"],["入社","にゅうしゃ","Joining a company","c10"],["退社","たいしゃ","Leaving a company","c10"],["転職","てんしょく","Changing jobs","c10"],["採用","さいよう","Recruitment / Hiring","c10"],["面接","めんせつ","Job interview","c10"],["履歴書","りれきしょ","CV / Daftar riwayat hidup","c10"],["応募","おうぼ","Application / Registration","c10"],["昇進","しょうしん","Promotion","c10"],["研修","けんしゅう","Training","c10"],["報告書","ほうこくしょ","Report","c10"],["資料","しりょう","Materials / Reference","c10"],["プレゼン","プレゼン","Presentation","c10"],["担当","たんとう","Person in charge","c10"],["役割","やくわり","Role / Task","c10"],["目標","もくひょう","Target / Goal","c10"],["成果","せいか","Result / Achievement","c10"],["クラス","クラス","! Class","c10"],["教室","きょうしつ","! Classroom","c10"],["図書室","としょしつ","School library","c10"],["職員室","しょくいんしつ","Staff room / Teachers' room","c10"],["体育","たいいく","Physical education / PE","c10"],["理科","りか","Natural science","c10"],["算数","さんすう","Elementary school math","c10"],["数学","すうがく","Mathematics (middle school and above)","c10"],["国語","こくご","Japanese language (subject)","c10"],["英語","えいご","English (language)","c10"],["歴史","れきし","History","c10"],["地理","ちり","Geography","c10"],["美術","びじゅつ","Fine arts","c10"],["入試","にゅうし","! Entrance exam","c10"],["合格","ごうかく","Pass an exam","c10"],["不合格","ふごうかく","Fail / Not passing","c10"],["奨学金","しょうがくきん","Scholarship","c10"],["学費","がくひ","Tuition / School fee","c10"],["校長","こうちょう","School principal","c10"],["文字","もじ","Character / Letter","c10"],["漢字","かんじ","Kanji character","c10"],["ひらがな","ひらがな","Hiragana character","c10"],["カタカナ","カタカナ","Katakana character","c10"],["言語","げんご","Language / Linguistics","c10"],["作文","さくぶん","! Essay / Composition","c10"],["発音","はつおん","! Pronunciation","c10"],["文法","ぶんぽう","! Grammar","c10"],["読解","どっかい","Reading comprehension","c10"],["課題","かだい","Assignment / Topic","c10"],["発表","はっぴょう","Presentation / Announcement","c10"],["討論","とうろん","Debate / Discussion","c10"],["実験","じっけん","Experiment","c10"],["観察","かんさつ","Observation","c10"],["記録","きろく","Note / Record","c10"],["グループワーク","グループワーク","Group work","c10"],["校則","こうそく","School rules","c10"],["遠足","えんそく","School trip / Excursion","c10"],["運動会","うんどうかい","! Sports day","c10"],["文化祭","ぶんかさい","! School culture festival","c10"],["修学旅行","しゅうがくりょこう","School trip / Educational excursion","c10"],["委員会","いいんかい","Committee / Student council","c10"],["チーム","チーム","Team / Group","c10"],["グループ","グループ","Group","c10"],["組","くみ","Class / Group","c10"],["班","はん","Small group / Squad","c10"],["番号","ばんごう","Number","c10"],["住所","じゅうしょ","Address","c10"],["電話番号","でんわばんごう","Phone number","c10"],["メール","メール","Email / Message","c10"],["メッセージ","メッセージ","Message","c10"],["手紙","てがみ","! Letter","c10"],["封筒","ふうとう","! Envelope","c10"],["切手","きって","! Stamp (postal)","c10"],["語彙","ごい","Vocabulary","c10"],["翻訳","ほんやく","Translation","c10"],["通訳","つうやく","Interpreter","c10"],["辞典","じてん","Dictionary","c10"],["時間割","じかんわり","Class schedule / Timetable","c10"],["クラブ","クラブ","Klub / Ekstrakurikuler","c10"],["部活","ぶかつ","! Club activities","c10"],["体育祭","たいいくさい","School sports festival","c10"],["卒業式","そつぎょうしき","Graduation ceremony","c10"],["入学式","にゅうがくしき","School entrance ceremony","c10"],["企業","きぎょう","Company / Corporation","c10"],["中小企業","ちゅうしょうきぎょう","SME / Small-medium enterprise","c10"],["就職","しゅうしょく","Getting a job","c10"],["退職","たいしょく","Retirement / Leaving work","c10"],["求人","きゅうじん","Job opening / Recruitment","c10"],["ミーティング","ミーティング","Meeting","c10"],["チームワーク","チームワーク","Teamwork","c10"],["社会科","しゃかいか","Social studies (elementary)","c10"],["公民","こうみん","Citizenship / Nationality","c10"],["物理","ぶつり","Physics","c10"],["化学","かがく","Chemistry","c10"],["生物","せいぶつ","Biology","c10"],["地学","ちがく","Earth science / Geology","c10"],["倫理","りんり","Ethics / Morals","c10"],["哲学","てつがく","Philosophy","c10"],["家庭科","かていか","Home economics / Domestic skills","c10"],["お金","おかね","Uang","c11"],["値段","ねだん","! Price","c11"],["料金","りょうきん","Fee / Rate","c11"],["税金","ぜいきん","Tax","c11"],["割引","わりびき","! Discount","c11"],["釣り銭","つりせん","Change (money)","c11"],["レシート","レシート","! Receipt","c11"],["袋","ふくろ","Bag / Plastic bag","c11"],["品物","しなもの","Item / Goods","c11"],["売り場","うりば","Sales floor / Sales section","c11"],["セール","セール","! Obral / Sale","c11"],["カード","カード","Kartu","c11"],["現金","げんきん","Uang tunai","c11"],["貯金","ちょきん","Tabungan","c11"],["口座","こうざ","Bank account","c11"],["病気","びょうき","! Illness / Sickness","c12"],["風邪","かぜ","! Cold / Flu","c12"],["熱","ねつ","! Fever","c12"],["頭痛","ずつう","! Headache","c12"],["腹痛","ふくつう","! Stomachache","c12"],["怪我","けが","Injury / Wound","c12"],["薬","くすり","! Medicine","c12"],["注射","ちゅうしゃ","! Injection / Shot","c12"],["手術","しゅじゅつ","! Surgery / Operation","c12"],["入院","にゅういん","! Hospitalization","c12"],["体温","たいおん","Body temperature","c12"],["血圧","けつあつ","! Blood pressure","c12"],["アレルギー","アレルギー","! Allergy","c12"],["診察","しんさつ","Medical examination","c12"],["処方箋","しょほうせん","Medical prescription","c12"],["服","ふく","! Clothes / Clothing","c13"],["シャツ","シャツ","! Kemeja","c13"],["ズボン","ズボン","! Trousers","c13"],["スカート","スカート","! Skirt","c13"],["コート","コート","! Coat","c13"],["セーター","セーター","! Sweater","c13"],["ジャケット","ジャケット","! Jacket","c13"],["下着","したぎ","Underwear","c13"],["靴下","くつした","! Socks","c13"],["靴","くつ","! Shoes","c13"],["スニーカー","スニーカー","Sneakers","c13"],["帽子","ぼうし","! Topi","c13"],["手袋","てぶくろ","! Sarung tangan","c13"],["マフラー","マフラー","! Scarf","c13"],["眼鏡","めがね","! Kacamata","c13"],["指輪","ゆびわ","Ring","c13"],["ネックレス","ネックレス","Necklace","c13"],["サイズ","サイズ","! Size","c13"],["色","いろ","! Color","c13"],["映画","えいが","! Film / Movie","c14"],["音楽","おんがく","! Music","c14"],["スポーツ","スポーツ","! Olahraga","c14"],["旅行","りょこう","! Trip / Travel","c14"],["写真","しゃしん","! Photo / Picture","c14"],["絵","え","! Picture / Painting","c14"],["漫画","まんが","Komik / Manga","c14"],["ゲーム","ゲーム","! Game / Play","c14"],["ラジオ","ラジオ","! Radio","c14"],["インターネット","インターネット","Internet","c14"],["パーティー","パーティー","Pesta","c14"],["趣味","しゅみ","! Hobby","c14"],["試合","しあい","Match / Game / Competition","c14"],["練習","れんしゅう","Practice / Training","c14"],["コンサート","コンサート","Concert","c14"],["祭り","まつり","Festival","c14"],["休み","やすみ","Holiday / Break","c14"],["散歩","さんぽ","To take a walk","c14"],["意味","いみ","Meaning","c15"],["理由","りゆう","! Reason","c15"],["問題","もんだい","! Problem / Question","c15"],["答え","こたえ","Answer","c15"],["気持ち","きもち","Feeling / Emotion","c15"],["気","き","Attention / Energy","c15"],["考え","かんがえ","Thought / Idea","c15"],["意見","いけん","Pendapat","c15"],["言葉","ことば","Kata / Bahasa","c15"],["話","はなし","Story / Talk","c15"],["声","こえ","! Voice","c15"],["音","おと","Sound (object)","c15"],["夢","ゆめ","Dream / Aspiration","c15"],["経験","けいけん","Experience","c15"],["生活","せいかつ","! Daily life / Everyday life","c15"],["文化","ぶんか","! Culture","c15"],["習慣","しゅうかん","! Habit / Custom","c15"],["方法","ほうほう","! Way / Method","c15"],["場合","ばあい","Case / Situation","c15"],["チャンス","チャンス","Chance / Opportunity","c15"],["目的","もくてき","Purpose / Goal","c15"],["計画","けいかく","Plan","c15"],["関係","かんけい","Relationship","c15"],["影響","えいきょう","Influence","c15"],["変化","へんか","Change","c15"],["予定","よてい","! Schedule / Plan","c15"],["結果","けっか","Result / Outcome","c15"],["原因","げんいん","Cause / Reason","c15"],["特徴","とくちょう","Characteristic / Feature","c15"],["様子","ようす","Condition / Situation","c15"],["商品","しょうひん","! Product / Merchandise","c11"],["在庫","ざいこ","! Stock / Inventory","c11"],["品切れ","しなぎれ","Habis stok","c11"],["新商品","しんしょうひん","New product","c11"],["限定品","げんていひん","Limited edition","c11"],["定価","ていか","Official price / List price","c11"],["特価","とっか","Special price","c11"],["送料","そうりょう","Shipping fee / Delivery cost","c11"],["配達","はいたつ","! Delivery / Shipping","c11"],["注文","ちゅうもん","! Order","c11"],["支払い","しはらい","Pembayaran","c11"],["振り込み","ふりこみ","Bank transfer","c11"],["引き落とし","ひきおとし","Auto-debit / Automatic transfer","c11"],["利子","りし","Interest (money)","c11"],["ローン","ローン","Loan / Mortgage","c11"],["保険","ほけん","Insurance","c11"],["年金","ねんきん","Pension","c11"],["家賃","やちん","Rent","c11"],["光熱費","こうねつひ","Electricity and gas bill","c11"],["水道代","すいどうだい","Water bill","c11"],["内科","ないか","Internal medicine (specialist)","c12"],["外科","げか","Surgery (specialty)","c12"],["歯科","しか","Dentistry (specialty)","c12"],["眼科","がんか","Ophthalmology (specialty)","c12"],["皮膚科","ひふか","Dermatology (specialty)","c12"],["産婦人科","さんふじんか","Obstetrics & Gynecology","c12"],["小児科","しょうにか","Pediatrics / Children","c12"],["精神科","せいしんか","Psychiatry","c12"],["救急","きゅうきゅう","Emergency","c12"],["救急車","きゅうきゅうしゃ","Ambulance","c12"],["血液型","けつえきがた","Blood type","c12"],["身長","しんちょう","Height (body)","c12"],["体重","たいじゅう","! Body weight","c12"],["視力","しりょく","Eyesight / Visual acuity","c12"],["虫歯","むしば","Cavity / Tooth decay","c12"],["骨折","こっせつ","Patah tulang","c12"],["打撲","だぼく","Bruise / Bump","c12"],["熱中症","ねっちゅうしょう","Heatstroke","c12"],["花粉症","かふんしょう","Hay fever / Pollen allergy","c12"],["睡眠","すいみん","Sleep / Rest","c12"],["食欲","しょくよく","Appetite","c12"],["体力","たいりょく","Stamina / Physical strength","c12"],["免疫","めんえき","Immunity","c12"],["ウイルス","ウイルス","Virus","c12"],["菌","きん","Bacteria / Germ","c12"],["症状","しょうじょう","! Symptom","c12"],["回復","かいふく","Recovery","c12"],["健康診断","けんこうしんだん","Health checkup","c12"],["栄養","えいよう","Nutrition","c12"],["カロリー","カロリー","Kalori","c12"],["和服","わふく","! Traditional Japanese clothing","c13"],["着物","きもの","! Kimono","c13"],["浴衣","ゆかた","Yukata","c13"],["袴","はかま","Hakama","c13"],["制服","せいふく","Uniform","c13"],["スーツ","スーツ","! Suit","c13"],["ネクタイ","ネクタイ","Necktie","c13"],["ワイシャツ","ワイシャツ","Dress shirt / White shirt","c13"],["ブラウス","ブラウス","Blouse","c13"],["ワンピース","ワンピース","Dress / Gaun","c13"],["パジャマ","パジャマ","Pajamas","c13"],["水着","みずぎ","Swimsuit / Swimwear","c13"],["手ぬぐい","てぬぐい","Japanese hand towel","c13"],["バッグ","バッグ","Bag","c13"],["ベルト","ベルト","! Belt","c13"],["ブーツ","ブーツ","Boots","c13"],["サンダル","サンダル","Sandals","c13"],["スリッパ","スリッパ","Indoor slippers","c13"],["布","ぬの","Cloth / Fabric","c13"],["綿","めん","Katun","c13"],["シルク","シルク","Sutra","c13"],["ウール","ウール","Wol","c13"],["模様","もよう","Pattern / Design","c13"],["縞模様","しまもよう","Striped pattern","c13"],["水玉模様","みずたまもよう","Polka dot pattern","c13"],["野球","やきゅう","! Baseball","c14"],["サッカー","サッカー","! Soccer / Football","c14"],["テニス","テニス","! Tenis","c14"],["バスケットボール","バスケットボール","Basketball","c14"],["バレーボール","バレーボール","Volleyball","c14"],["水泳","すいえい","! Swimming","c14"],["ランニング","ランニング","Running","c14"],["ハイキング","ハイキング","Hiking","c14"],["キャンプ","キャンプ","Camping","c14"],["釣り","つり","To fish","c14"],["登山","とざん","Mountain climbing / Hiking","c14"],["ダンス","ダンス","Dance","c14"],["ヨガ","ヨガ","Yoga","c14"],["武道","ぶどう","Martial arts","c14"],["柔道","じゅうどう","Judo","c14"],["剣道","けんどう","Kendo","c14"],["空手","からて","Karate","c14"],["絵描き","えかき","Painting / Drawing","c14"],["書道","しょどう","Japanese calligraphy","c14"],["裁縫","さいほう","Sewing","c14"],["編み物","あみもの","Knitting / Crocheting","c14"],["ガーデニング","ガーデニング","Gardening","c14"],["読書","どくしょ","! Reading books","c14"],["俳句","はいく","Haiku (Japanese short poem)","c14"],["カラオケ","カラオケ","Karaoke","c14"],["ボードゲーム","ボードゲーム","Board game","c14"],["将棋","しょうぎ","Shogi (catur Jepang)","c14"],["囲碁","いご","Go (board game)","c14"],["麻雀","マージャン","Mahjong","c14"],["温泉","おんせん","! Hot spring bath","c14"],["銭湯","せんとう","Public bath / Sento","c14"],["花火","はなび","Fireworks","c14"],["紅葉狩り","もみじがり","Autumn leaf viewing","c14"],["花見","はなみ","Cherry blossom viewing","c14"],["事実","じじつ","Fact / Reality","c15"],["真実","しんじつ","Truth","c15"],["嘘","うそ","Lie / Falsehood","c15"],["秘密","ひみつ","Secret","c15"],["情報","じょうほう","Information","c15"],["知識","ちしき","Knowledge","c15"],["記憶","きおく","Memory","c15"],["想像","そうぞう","Imagination","c15"],["創造","そうぞう","Creation","c15"],["発見","はっけん","Discovery","c15"],["発明","はつめい","Invention","c15"],["技術","ぎじゅつ","Technology / Technique","c15"],["科学","かがく","Science / Knowledge","c15"],["研究","けんきゅう","Research","c15"],["調査","ちょうさ","Survey / Investigation","c15"],["結論","けつろん","Conclusion","c15"],["議論","ぎろん","Discussion / Debate","c15"],["批判","ひはん","Criticism / Critique","c15"],["賛成","さんせい","Agreement / Consent","c15"],["反対","はんたい","Opposition / Disagreement","c15"],["協力","きょうりょく","Cooperation / Collaboration","c15"],["競争","きょうそう","Competition / Rivalry","c15"],["努力","どりょく","Effort / Hard work","c15"],["成功","せいこう","Success","c15"],["失敗","しっぱい","Failure","c15"],["挑戦","ちょうせん","Challenge / Attempt","c15"],["決意","けつい","Determination / Decision","c15"],["自信","じしん","Self-confidence","c15"],["勇気","ゆうき","Courage / Bravery","c15"],["希望","きぼう","Hope","c15"],["絶望","ぜつぼう","Despair / Hopelessness","c15"],["不安","ふあん","Anxiety / Worry","c15"],["安心","あんしん","Relief / Peace of mind","c15"],["満足","まんぞく","Satisfaction","c15"],["不満","ふまん","Dissatisfaction","c15"],["幸福","こうふく","Happiness / Bliss","c15"],["苦労","くろう","Hardship / Hard work","c15"],["喜び","よろこび","Joy / Delight","c15"],["怒り","いかり","Anger","c15"],["悲しみ","かなしみ","Sadness / Sorrow","c15"],["驚き","おどろき","Surprise / Shock","c15"],["恥","はじ","Shame / Embarrassment","c15"],["誇り","ほこり","Pride","c15"],["後悔","こうかい","Regret / Remorse","c15"],["感謝","かんしゃ","Gratitude / Thankfulness","c15"],["尊敬","そんけい","Respect","c15"],["信頼","しんらい","Trust / Reliance","c15"],["友情","ゆうじょう","Friendship","c15"],["愛情","あいじょう","Affection / Love","c15"],["自由","じゆう","Freedom / Liberty","c15"],["平等","びょうどう","Equality","c15"],["正義","せいぎ","Justice","c15"],["責任","せきにん","Responsibility","c15"],["義務","ぎむ","Duty / Obligation","c15"],["権利","けんり","Right","c15"],["ルール","ルール","Rule / Regulation","c15"],["マナー","マナー","Etiquette / Manners","c15"],["常識","じょうしき","Common sense / General knowledge","c15"],["価値","かち","Value / Self-worth","c15"],["基準","きじゅん","Standard / Benchmark","c15"],["限界","げんかい","Limit / Boundary","c15"],["可能性","かのうせい","Possibility / Potential","c15"],["必要性","ひつようせい","Necessity / Need","c15"],["重要性","じゅうようせい","Importance / Significance","c15"],["おつり","おつり","! Change (money returned)","c11"],["小銭","こぜに","Coins / Small change","c11"],["お札","おさつ","Banknote / Paper money","c11"],["自動販売機","じどうはんばいき","Vending machine","c11"],["ATM","ATM","ATM","c11"],["電子マネー","でんしマネー","Electronic money / E-money","c11"],["QRコード","QRコード","QR code","c11"],["ポイント","ポイント","Points (reward)","c11"],["クーポン","クーポン","Discount coupon","c11"],["おまけ","おまけ","Bonus / Free extra item","c11"],["大売り出し","おおうりだし","Big sale / Clearance","c11"],["展示品","てんじひん","Display item","c11"],["サンプル","サンプル","Example / Sample","c11"],["診療所","しんりょうじょ","Clinic / Medical center","c12"],["性格","せいかく","Personality / Character","c12"],["態度","たいど","Attitude / Behavior","c12"],["表情","ひょうじょう","Facial expression","c12"],["けが","けが","Injury / Wound","c12"],["せき","せき","To cough","c12"],["くしゃみ","くしゃみ","To sneeze","c12"],["めまい","めまい","Dizziness / Vertigo","c12"],["吐き気","はきけ","Nausea","c12"],["下痢","げり","Diarrhea","c12"],["便秘","べんぴ","Constipation","c12"],["肥満","ひまん","Obesity / Overweight","c12"],["禁煙","きんえん","No smoking / Quit smoking","c12"],["水分","すいぶん","Liquid / Moisture content","c12"],["運動不足","うんどうぶそく","Lack of exercise","c12"],["ストレス","ストレス","Stress","c12"],["リラックス","リラックス","Relaxation","c12"],["スカーフ","スカーフ","Scarf / Shawl","c13"],["ハンカチ","ハンカチ","Handkerchief","c13"],["半袖","はんそで","Short sleeve","c13"],["長袖","ながそで","Long sleeve","c13"],["パンツ","パンツ","Pants (general)","c13"],["ジーンズ","ジーンズ","Jeans / Denim pants","c13"],["Tシャツ","Tシャツ","Kaos","c13"],["タイツ","タイツ","Leggings / Tights","c13"],["ソックス","ソックス","Long socks","c13"],["ジャージ","ジャージ","Sportswear / Jersey","c13"],["エプロン","エプロン","Apron","c13"],["コスチューム","コスチューム","Costume","c13"],["デザイン","デザイン","Design / Pattern","c13"],["ブランド","ブランド","! Brand","c13"],["流行り","はやり","Fashion / Trend","c13"],["アニメ","アニメ","Anime","c14"],["ドラマ","ドラマ","Drama / TV series","c14"],["バラエティ","バラエティ","Variety show","c14"],["ドキュメンタリー","ドキュメンタリー","Documentary","c14"],["ニュース","ニュース","! News","c14"],["天気予報","てんきよほう","! Weather forecast","c14"],["コレクション","コレクション","Collection","c14"],["スケッチ","スケッチ","Sketch","c14"],["ハンドメイド","ハンドメイド","Handmade","c14"],["ピアノ","ピアノ","! Piano","c14"],["ギター","ギター","! Guitar","c14"],["バイオリン","バイオリン","Violin","c14"],["フルート","フルート","Flute","c14"],["ドラム","ドラム","Drum","c14"],["ボーリング","ボーリング","Bowling","c14"],["ゴルフ","ゴルフ","Golf","c14"],["スキー","スキー","Ski","c14"],["スノーボード","スノーボード","Snowboard","c14"],["サーフィン","サーフィン","Surfing","c14"],["サイクリング","サイクリング","Cycling","c14"],["社会","しゃかい","! Society / Social","c15"],["政治","せいじ","! Politics","c15"],["経済","けいざい","! Economy","c15"],["法律","ほうりつ","Law / Regulation","c15"],["教育","きょういく","Education","c15"],["医療","いりょう","Healthcare / Medical","c15"],["平和","へいわ","Peace","c15"],["戦争","せんそう","War","c15"],["組織","そしき","Organization","c15"],["文明","ぶんめい","Civilization","c15"],["宗教","しゅうきょう","Religion","c15"],["国際","こくさい","International","c15"],["社会人","しゃかいじん","Member of society / Worker","c15"],["文章","ぶんしょう","Sentence / Text","c15"],["形","かたち","Shape / Form","c15"],["表現","ひょうげん","Expression / Phrase","c15"],["対話","たいわ","Dialogue / Conversation","c15"],["交流","こうりゅう","Exchange / Interaction","c15"],["ルーティン","ルーティン","Routine","c15"],["スケジュール","スケジュール","Schedule","c15"],["プロジェクト","プロジェクト","Project","c15"],["アイデア","アイデア","Idea","c15"],["テーマ","テーマ","Theme","c15"],["タイトル","タイトル","Title","c15"],["内容","ないよう","Content","c15"],["詳細","しょうさい","Details","c15"],["まとめ","まとめ","Summary / Conclusion","c15"],["評価","ひょうか","Assessment / Evaluation","c15"],["比較","ひかく","Comparison","c15"],["分析","ぶんせき","Analysis","c15"],["解決","かいけつ","Resolution / Solution","c15"],["対策","たいさく","Countermeasure / Response","c15"],["準備","じゅんび","Preparation","c15"],["確認","かくにん","Confirmation / Verification","c15"],["連絡","れんらく","Contact / Notification","c15"],["報告","ほうこく","Report","c15"],["提案","ていあん","Proposal / Suggestion","c15"],["説明","せつめい","Explanation","c15"],["質問","しつもん","Question","c15"],["返事","へんじ","Reply / Answer","c15"],["許可","きょか","Permission / Approval","c15"],["断り","ことわり","Refusal / Rejection","c15"],["約束","やくそく","Promise / Appointment","c15"],["命令","めいれい","Order / Command","c15"],["お願い","おねがい","Request / Plea","c15"],["歓迎","かんげい","Welcome / Reception","c15"],["紹介","しょうかい","Introduction","c15"],["招待","しょうたい","Invitation","c15"],["お礼","おれい","Expression of gratitude","c15"],["励まし","はげまし","Encouragement / Cheering on","c15"],["相談","そうだん","Consultation / Talking it out","c15"],["チャット","チャット","Chat / Message","c15"],["SNS","SNS","Social media","c15"],["ウェブサイト","ウェブサイト","Website","c15"],["ダウンロード","ダウンロード","Download","c15"],["アップロード","アップロード","Upload","c15"],["クラウド","クラウド","Cloud computing","c15"],["AI","AI","Artificial intelligence / AI","c15"],["ロボット","ロボット","Robot","c15"],["プログラム","プログラム","Program","c15"],["コード","コード","Code","c15"],["バグ","バグ","Bug / Error","c15"],["セキュリティ","セキュリティ","Security","c15"],["アカウント","アカウント","Account","c15"],["プロフィール","プロフィール","Profile","c15"],["フォロワー","フォロワー","Follower","c15"],["いいね","いいね","Like","c15"],["コメント","コメント","Comment","c15"],["シェア","シェア","Share","c15"],["投稿","とうこう","Post / Upload","c15"],["動画","どうが","Video","c14"],["配信","はいしん","Live broadcast / Streaming","c14"],["サブスク","サブスク","Subscription","c14"],["キャラクター","キャラクター","Character","c14"],["ゲーム機","ゲームき","Game console","c14"],["スコア","スコア","Score","c14"],["レベル","レベル","Level","c14"],["アイテム","アイテム","Item","c14"],["ボス","ボス","Boss (game)","c14"],["プレイヤー","プレイヤー","Player","c14"],["応援","おうえん","Support / Cheering","c14"],["優勝","ゆうしょう","Champion / Victory","c14"],["メダル","メダル","Medal","c14"],["トロフィー","トロフィー","Trophy","c14"],["領収書","りょうしゅうしょ","! Receipt","c11"],["クレジットカード","クレジットカード","Credit card","c11"],["銀行振込","ぎんこうふりこみ","Bank transfer","c11"],["会員カード","かいいんカード","Membership card","c11"],["バーゲン","バーゲン","Big discount / Bargain sale","c11"],["免税","めんぜい","Tax-free / Duty-free","c11"],["お釣り","おつり","Change (money)","c11"],["代金","だいきん","Price / Payment","c11"],["合計","ごうけい","Total / Sum","c11"],["消費税","しょうひぜい","! Consumption tax","c11"],["入場料","にゅうじょうりょう","Admission ticket","c11"],["予算","よさん","Budget","c11"],["治療","ちりょう","! Treatment / Therapy","c12"],["予防接種","よぼうせっしゅ","Vaccination","c12"],["消防車","しょうぼうしゃ","Fire truck","c12"],["パトカー","パトカー","Police car","c12"],["捻挫","ねんざ","Sprain","c12"],["やけど","やけど","Burn","c12"],["食中毒","しょくちゅうどく","Food poisoning","c12"],["不眠","ふみん","Insomnia / Can't sleep","c12"],["伝統","でんとう","Tradition","c15"],["重力","じゅうりょく","Gravity","c15"],["エネルギー","エネルギー","Energy","c15"],["原子力","げんしりょく","Nuclear energy","c15"],["電力","でんりょく","Electric power","c15"],["石油","せきゆ","Petroleum / Crude oil","c15"],["資源","しげん","Resource","c15"],["廃棄物","はいきぶつ","Waste","c15"],["リサイクル","リサイクル","Recycling","c15"],["ゴミ分別","ゴミぶんべつ","Waste sorting / Garbage separation","c15"],["温暖化","おんだんか","Global warming","c15"],["排気ガス","はいきガス","Exhaust gas / Emissions","c15"],["省エネ","しょうエネ","Energy saving","c15"],["有機","ゆうき","Organic","c15"],["無農薬","むのうやく","Pesticide-free","c15"],["エコ","エコ","Eco-friendly / Environmentally friendly","c15"],["宝くじ","たからくじ","Lottery","c11"],["お土産","おみやげ","Souvenir / Gift","c11"],["貯蓄","ちょちく","Savings","c11"],["借金","しゃっきん","Debt","c11"],["収入","しゅうにゅう","Income / Earnings","c11"],["支出","ししゅつ","Expenditure","c11"],["経費","けいひ","Operating cost / Expense","c11"],["利益","りえき","Profit / Earnings","c11"],["損失","そんしつ","Loss","c11"],["投資","とうし","Investment","c11"],["株","かぶ","Stock / Shares","c11"],["為替","かわせ","Exchange rate","c11"],["輸出","ゆしゅつ","Export","c15"],["輸入","ゆにゅう","Import","c15"],["貿易","ぼうえき","International trade","c15"],["字","じ","Character / Handwriting","c15"],["段落","だんらく","Paragraph","c15"],["要点","ようてん","Key points","c15"],["トピック","トピック","Topic","c15"],["データ","データ","Data","c15"],["統計","とうけい","Statistics","c15"],["証拠","しょうこ","Evidence / Proof","c15"],["理論","りろん","Theory","c15"],["仮説","かせつ","Hypothesis","c15"],["応用","おうよう","Application","c15"],["革命","かくめい","Revolution","c15"],["進化","しんか","Evolution / Progress","c15"],["発展","はってん","Development / Progress","c15"],["衰退","すいたい","Decline / Regression","c15"],["繁栄","はんえい","Prosperity","c15"],["貧困","ひんこん","Poverty","c15"],["格差","かくさ","Gap / Disparity","c15"],["差別","さべつ","Discrimination","c15"],["偏見","へんけん","Prejudice / Bias","c15"],["多様性","たようせい","Diversity","c15"],["共存","きょうぞん","Coexistence","c15"],["改善","かいぜん","Improvement / Repair","c15"],["リスク","リスク","Risk","c15"],["メリット","メリット","Keuntungan / Kelebihan","c15"],["デメリット","デメリット","Kerugian / Kekurangan","c15"],["バランス","バランス","Balance","c15"],["優先順位","ゆうせんじゅんい","Priority","c15"],["エチケット","エチケット","Etiquette","c15"],["ライフスタイル","ライフスタイル","Lifestyle","c15"],["価値観","かちかん","Values","c15"],["世界観","せかいかん","Worldview / World perspective","c15"],["人生観","じんせいかん","Life philosophy / Outlook on life","c15"],["信念","しんねん","Belief / Conviction","c15"],["野心","やしん","Ambition","c15"],["情熱","じょうねつ","Passion / Enthusiasm","c15"],["忍耐","にんたい","Patience / Perseverance","c15"],["謙虚さ","けんきょさ","Humility / Modesty","c15"],["誠実さ","せいじつさ","Honesty / Sincerity","c15"],["思いやり","おもいやり","Empathy / Compassion","c15"],["尊重","そんちょう","Respect / Reverence","c15"],["絆","きずな","Bond / Close relationship","c15"],["家族愛","かぞくあい","Family affection / Family love","c15"],["愛着","あいちゃく","Attachment / Fondness","c15"],["孤独","こどく","Loneliness / Solitude","c15"],["寂しさ","さびしさ","Feeling of loneliness","c15"],["恐怖","きょうふ","Fear","c15"],["緊張","きんちょう","Tension / Nervousness","c15"],["反省","はんせい","Reflection / Introspection","c15"],["プライド","プライド","Pride / Self-esteem","c15"],["癒し","いやし","Healing / Peace of mind","c15"],["モチベーション","モチベーション","Motivation","c15"],["インスピレーション","インスピレーション","Inspiration","c15"],["創造性","そうぞうせい","Creativity","c15"],["想像力","そうぞうりょく","Imagination","c15"],["集中力","しゅうちゅうりょく","Concentration ability","c15"],["判断力","はんだんりょく","Judgment / Decision-making ability","c15"],["コミュニケーション","コミュニケーション","Communication","c15"],["ポロシャツ","ポロシャツ","Polo shirt","c13"],["リュック","リュック","Backpack / Rucksack","c13"],["ハンドバッグ","ハンドバッグ","Handbag / Purse","c13"],["ポケット","ポケット","Pocket","c13"],["ボタン","ボタン","Button","c13"],["ファスナー","ファスナー","Zipper","c13"],["柄","がら","Pattern / Motif","c13"],["無地","むじ","Plain / No pattern","c13"],["水玉","みずたま","Polkadot","c13"],["細胞","さいぼう","Cell (biology)","c15"],["遺伝子","いでんし","Gene","c15"],["ホルモン","ホルモン","Hormone","c12"],["ビタミン","ビタミン","Vitamin","c12"],["ダイエット","ダイエット","Diet","c15"],["筋トレ","きんトレ","Weight training / Gym workout","c14"],["ストレッチ","ストレッチ","Stretching","c14"],["マッサージ","マッサージ","Massage","c14"],["整体","せいたい","Chiropractic / Spinal therapy","c12"],["針治療","はりちりょう","Acupuncture","c12"],["お会計","おかいけい","Bill / Check","c11"],["割り勘","わりかん","Going Dutch / Split the bill","c11"],["おごり","おごり","Treating someone / Paying for others","c11"],["チップ","チップ","Tip / Gratuity","c11"],["お直し","おなおし","Clothing alteration","c13"],["洗濯表示","せんたくひょうじ","Laundry care label","c13"],["新作","しんさく","New product / New work","c13"],["シーズン","シーズン","Musim / Season","c13"],["ネットショッピング","ネットショッピング","Online shopping","c11"],["返品","へんぴん","! Return of goods / Refund","c11"],["交換","こうかん","Exchange / Swap","c11"],["保証書","ほしょうしょ","Warranty card","c11"],["ホームパーティー","ホームパーティー","House party","c14"],["バーベキュー","バーベキュー","Barbecue","c14"],["ピクニック","ピクニック","Picnic","c14"],["スキューバダイビング","スキューバダイビング","Scuba diving","c14"],["マラソン","マラソン","Marathon","c14"],["トレッキング","トレッキング","Trekking / Long-distance hiking","c14"]];


const particles=[["は","は","! Topic marker","topic","N5"],["が","が","! Subject marker","case","N5"],["を","を","! Direct object marker","case","N5"],["に","に","! To / At / On (time, place, destination)","case","N5"],["へ","へ","! Toward / In the direction of","case","N5"],["で","で","! At / By (place of action / tool)","case","N5"],["と","と","! And / With (together)","case","N5"],["の","の","! Possession / Of (noun connector)","case","N5"],["も","も","! Also / Too","topic","N5"],["か","か","! Question marker","end","N5"],["ね","ね","! Right? / Isn't it? (confirmation)","end","N5"],["よ","よ","! You know / I'm telling you (assertion)","end","N5"],["よね","よね","! Right? (assertion + confirmation)","end","N5"],["から","から","! From / Because (origin / reason)","case","N5"],["まで","まで","! Until / Up to","case","N5"],["より","より","! From / Than (comparison)","case","N5"],["しか〜ない","しか〜ない","! Only ~ (exclusive, always negative)","adv","N5"],["だけ","だけ","! Only / Just","adv","N5"],["でも","でも","! Even / Or something like that","adv","N5"],["ばかり","ばかり","Only / Constantly / Just did","adv","N4"],["など","など","And so on / For example","adv","N4"],["とか","とか","Like / And so on (casual)","adv","N4"],["くらい／ぐらい","くらい／ぐらい","About / Approximately","adv","N4"],["ほど","ほど","About / As much as / The more...the more","adv","N4"],["ずつ","ずつ","Each / Per (distribution)","adv","N4"],["さえ","さえ","Even / As long as","adv","N3"],["こそ","こそ","Precisely / That is exactly (emphasis)","adv","N3"],["ながら","ながら","While / Although","conj","N4"],["て／で","て／で","! And then / By means of (te-form)","conj","N5"],["けど／けれど","けど／けれど","But / Although (casual)","conj","N4"],["のに","のに","Even though / Despite (disappointment)","conj","N4"],["ので","ので","Because (formal / polite)","conj","N4"],["し","し","And also / Besides (multiple reasons)","conj","N4"],["わ","わ","! Oh / Well (feminine, assertion)","end","N5"],["な","な","! Yeah / Right (masculine casual)","end","N5"],["かな","かな","I wonder / Hmm (self-doubt)","end","N4"],["じゃないか","じゃないか","Isn't that right? / Right?","end","N4"],["さ","さ","Hey / You see (casual, neutral)","end","N4"],["もん／もの","もん／もの","Because / It's just that (reason, feminine)","end","N4"]];

const expressions=[["おはようございます","おはようございます","! Good morning (formal)","greet","N5"],["おはよう","おはよう","! Good morning (casual)","greet","N5"],["こんにちは","こんにちは","! Good afternoon / Hello","greet","N5"],["こんばんは","こんばんは","! Good evening","greet","N5"],["はじめまして","はじめまして","! Nice to meet you (first time)","greet","N5"],["よろしくお願いします","よろしくおねがいします","! Please treat me well / Nice to meet you","greet","N5"],["おやすみなさい","おやすみなさい","! Good night (formal)","greet","N5"],["おやすみ","おやすみ","! Good night (casual)","greet","N5"],["さようなら","さようなら","! Goodbye (formal)","greet","N5"],["じゃあね","じゃあね","! Bye / See you (casual)","greet","N5"],["またね","またね","! See you again","greet","N5"],["いってきます","いってきます","! I'm heading out","greet","N5"],["いってらっしゃい","いってらっしゃい","! Take care / Have a good trip","greet","N5"],["ただいま","ただいま","! I'm home","greet","N5"],["おかえりなさい","おかえりなさい","! Welcome home","greet","N5"],["いただきます","いただきます","! Said before eating (Bon appétit)","greet","N5"],["ごちそうさまでした","ごちそうさまでした","! Thank you for the meal","greet","N5"],["お久しぶりです","おひさしぶりです","Long time no see (formal)","greet","N4"],["久しぶり","ひさしぶり","Long time no see (casual)","greet","N4"],["お元気ですか","おげんきですか","How are you? (formal)","greet","N4"],["元気？","げんき？","! How are you? (casual)","greet","N5"],["いらっしゃいませ","いらっしゃいませ","! Welcome (to a store/restaurant)","greet","N5"],["ありがとうございます","ありがとうございます","! Thank you (formal)","thanks","N5"],["ありがとう","ありがとう","! Thank you (casual)","thanks","N5"],["どうもありがとうございます","どうもありがとうございます","! Thank you very much (formal)","thanks","N5"],["どういたしまして","どういたしまして","! You're welcome","resp","N5"],["はい","はい","! Yes (formal)","resp","N5"],["いいえ","いいえ","! No (formal)","resp","N5"],["そうです","そうです","! That's right / Yes","resp","N5"],["そうですね","そうですね","! Yes, indeed / That's true","resp","N5"],["そうですか","そうですか","! Oh is that so? / Really?","resp","N5"],["わかりました","わかりました","! I understand / Got it","resp","N5"],["わかりません","わかりません","! I don't understand","resp","N5"],["知りません","しりません","! I don't know","resp","N5"],["大丈夫です","だいじょうぶです","! It's okay / I'm fine","resp","N5"],["すみません","すみません","! Excuse me / Sorry (general)","apol","N5"],["ごめんなさい","ごめんなさい","! I'm sorry (sincere)","apol","N5"],["ごめん","ごめん","! Sorry (casual)","apol","N5"],["申し訳ありません","もうしわけありません","I'm deeply sorry (very formal)","apol","N4"],["〜をください","〜をください","! Please give me ~","req","N5"],["〜てください","〜てください","! Please do ~","req","N5"],["〜てもいいですか","〜てもいいですか","! May I ~ ? / Is it okay to ~ ?","req","N5"],["〜てはいけません","〜てはいけません","! Must not do ~ / Not allowed to ~","req","N5"],["お願いします","おねがいします","! Please / I'm counting on you","req","N5"],["少々お待ちください","しょうしょうおまちください","Please wait a moment","req","N4"],["お疲れ様でした","おつかれさまでした","Good work / Thanks for your effort","other","N4"],["頑張ってください","がんばってください","Do your best! / Keep going!","other","N5"],["気をつけて","きをつけて","! Take care / Be careful","other","N5"],["よかった","よかった","! What a relief / Great","other","N5"],["残念です","ざんねんです","That's too bad / What a shame","other","N4"],["本当ですか","ほんとうですか","! Really? / Seriously?","other","N5"],["おめでとうございます","おめでとうございます","Congratulations! (formal)","other","N5"],["お大事に","おだいじに","Get well soon","other","N4"],["失礼します","しつれいします","Excuse me / I'll take my leave (formal)","other","N4"],["お先に失礼します","おさきにしつれいします","I'll leave ahead of you","other","N4"]];

const questions=[["何","なに／なん","! What","what","N5"],["誰","だれ","! Who","who","N5"],["どこ","どこ","! Where / Where to","where","N5"],["いつ","いつ","! When","when","N5"],["どれ","どれ","! Which one (from 3+)","which","N5"],["どの","どの","! Which ~ (before noun)","which","N5"],["どちら","どちら","! Which (of 2) / Which direction (polite)","which","N5"],["どう","どう","! How (method / impression)","how","N5"],["どんな","どんな","! What kind / What sort","how","N5"],["いくつ","いくつ","! How many (count / age)","howmany","N5"],["いくら","いくら","! How much (price)","howmuch","N5"],["なぜ","なぜ","! Why (formal)","why","N5"],["どうして","どうして","! Why (casual)","why","N5"],["なんで","なんで","! Why / How come (very casual)","why","N5"],["何時","なんじ","! What time","what","N5"],["何曜日","なんようび","! What day","what","N5"],["何月","なんがつ","! What month","what","N5"],["何日","なんにち","! What date","what","N5"],["何年","なんねん","! What year","what","N5"],["何番","なんばん","! What number","what","N5"],["何枚","なんまい","! How many sheets","howmany","N5"],["何人","なんにん","! How many people","howmany","N5"],["どのくらい","どのくらい","About how long / far / many","howmuch","N4"],["どれくらい","どれくらい","About how much","howmuch","N4"],["どうやって","どうやって","How to do it","how","N4"],["どのように","どのように","In what way (formal)","how","N4"],["いつから","いつから","Since when","when","N4"],["いつまで","いつまで","Until when","when","N4"],["どこへ","どこへ","! Where to","where","N5"],["どこから","どこから","! Where from","where","N5"],["何のために","なんのために","What for / For what purpose","why","N4"],["どちらのほうが","どちらのほうが","Which one is more ~","which","N4"]];

const pronouns=[["私","わたし","! I / Me (neutral)","1st","N5"],["わたくし","わたくし","! I / Me (very formal)","1st","N5"],["ぼく","ぼく","! I / Me (masculine casual)","1st","N5"],["おれ","おれ","! I / Me (masculine, rough)","1st","N5"],["あたし","あたし","! I / Me (feminine casual)","1st","N5"],["私たち","わたしたち","! We / Us","1st","N5"],["あなた","あなた","! You (formal)","2nd","N5"],["あなたたち","あなたたち","! You (plural)","2nd","N5"],["彼","かれ","! He / Boyfriend","3rd","N5"],["彼女","かのじょ","! She / Girlfriend","3rd","N5"],["彼ら","かれら","They (male / mixed)","3rd","N4"],["彼女たち","かのじょたち","They (female)","3rd","N4"],["これ","これ","! This (near speaker)","demo","N5"],["それ","それ","! That (near listener)","demo","N5"],["あれ","あれ","! That (far from both)","demo","N5"],["この","この","! This ~ (before noun)","demo","N5"],["その","その","! That ~ (before noun)","demo","N5"],["あの","あの","! That ~ over there (far)","demo","N5"],["ここ","ここ","! Here / This place","demo","N5"],["そこ","そこ","! There / That place","demo","N5"],["あそこ","あそこ","! Over there / That place (far)","demo","N5"],["こちら","こちら","! Here / This way (polite)","demo","N5"],["そちら","そちら","! There / That way (polite)","demo","N5"],["あちら","あちら","! Over there (polite)","demo","N5"],["こんな","こんな","! Like this / This kind","demo","N5"],["そんな","そんな","! Like that / That kind","demo","N5"],["あんな","あんな","! Like that (far)","demo","N5"],["みんな","みんな","! Everyone / All","other","N5"],["自分","じぶん","Oneself / Myself","other","N4"],["お互い","おたがい","Each other / One another","other","N4"]];

const fillers=[["あの〜","あの〜","! Uhm... / Uh... (hesitating to start)","filler","N5"],["えっと","えっと","! Hmm... / Uh... (thinking)","filler","N5"],["うーん","うーん","! Hmm... (considering)","filler","N5"],["なんか","なんか","! Like / Somehow (casual)","filler","N5"],["まあ","まあ","Well / I suppose (half-agreeing)","filler","N4"],["実は","じつは","! Actually... / To be honest...","filler","N4"],["それで","それで","! And then? / So? (asking to continue)","filler","N5"],["ところで","ところで","! By the way...","filler","N4"],["とにかく","とにかく","! Anyway / The point is","filler","N4"],["ちなみに","ちなみに","! By the way / As additional info","filler","N4"],["つまり","つまり","! In other words / So basically","filler","N4"],["おめでとう","おめでとう","Congratulations! (casual)","phrase","N5"],["よいお年を","よいおとしを","Happy New Year (before the new year)","phrase","N4"],["あけましておめでとう","あけましておめでとう","Happy New Year (after midnight)","phrase","N4"],["ご苦労様","ごくろうさま","Thank you for your work (superior to subordinate)","phrase","N4"],["頑張って","がんばって","Do your best! / Keep going!","phrase","N5"],["どきどき","どきどき","! Heart pounding (nervous / excited)","ono","N4"],["わくわく","わくわく","! Very excited / Can't wait","ono","N4"],["にこにこ","にこにこ","! Smiling / Cheerful","ono","N4"],["ぐるぐる","ぐるぐる","Spinning / Dizzy","ono","N4"],["ぴかぴか","ぴかぴか","Sparkling / Shining","ono","N4"],["ふわふわ","ふわふわ","Fluffy / Soft / Floating","ono","N4"],["ざわざわ","ざわざわ","Noisy / Bustling / Uneasy","ono","N4"],["さらさら","さらさら","Flowing smoothly / Silky (hair)","ono","N4"],["ぬるぬる","ぬるぬる","Slippery / Slimy","ono","N4"],["つるつる","つるつる","Smooth / Slick (surface)","ono","N4"],["ぐっすり","ぐっすり","! Sound asleep","ono","N4"],["いらいら","いらいら","! Irritated / Frustrated / Annoyed","ono","N4"],["はらはら","はらはら","Worried and nervous / Heart racing","ono","N4"],["もじもじ","もじもじ","Shy / Hesitant (fidgeting)","ono","N4"],["きらきら","きらきら","! Twinkling / Sparkling","ono","N5"],["ぺらぺら","ぺらぺら","! Fluent / Speaking smoothly","ono","N4"],["うとうと","うとうと","Drowsy / Half asleep","ono","N4"],["もふもふ","もふもふ","Fluffy / Thick and soft","ono","N4"]];

const TABS={
  verbs:{data:()=>verbs,cols:['#','','Kanji','Kana','Meaning','Type'],types:{u:'U-verb',ru:'RU-verb',irr:'Irregular'},hasLevel:false,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{u:'U-verb',ru:'RU-verb',irr:'Irregular'}[v[3]]||v[3]}</span></td>`;}},
  adjs:{data:()=>adjs,cols:['#','','Kanji','Kana','Meaning','Type','Level'],types:{i:'い-adj',na:'な-adj'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{i:'い-adj',na:'な-adj'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}},
  advs:{data:()=>advs,cols:['#','','Kanji','Kana','Meaning','Type','Level'],types:{deg:'Degree',freq:'Frequency',time:'Time',mann:'Manner',quant:'Quantity',affirm:'Affirmation'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{deg:'Degree',freq:'Frequency',time:'Time',mann:'Manner',quant:'Quantity',affirm:'Affirmation'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}},
  nouns:{data:()=>nouns.filter(v=>v[3]!=='c9'),cols:['#','','Kanji','Kana','Meaning','Kategori'],types:{c1:'People',c2:'Body',c3:'Time',c4:'Places',c5:'Food',c6:'Daily life',c7:'Transport',c8:'Nature',c10:'School',c11:'Shopping',c12:'Health',c13:'Clothing',c14:'Hobbies',c15:'General'},hasLevel:false,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${TABS.nouns.types[v[3]]||v[3]}</span></td>`;}},
  words:{data:()=>words,cols:['#','','Kata','Kana','Meaning','Type','Level'],types:{conj:'Conjunction',trans:'Transition',cond:'Conditional',add:'Additive',cont:'Contrast'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{conj:'Conjunction',trans:'Transition',cond:'Conditional',add:'Additive',cont:'Contrast'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}},
  counters:{data:()=>nouns.filter(v=>v[3]==='c9'),cols:['#','','Kanji','Kana','Meaning'],types:{},hasLevel:false,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td>`;}},
  particles:{data:()=>particles,cols:['#','','Particle','Reading','Meaning','Type','Level'],types:{topic:'Topic',case:'Case',conj:'Conjunctive',end:'Sentence-end',adv:'Adverbial'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{topic:'Topic',case:'Case',conj:'Conjunctive',end:'Sentence-end',adv:'Adverbial'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}},
  expressions:{data:()=>expressions,cols:['#','','Ekspresi','Reading','Meaning','Type','Level'],types:{greet:'Greeting',thanks:'Thanks',apol:'Apology',req:'Request',resp:'Response',other:'Other'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{greet:'Greeting',thanks:'Thanks',apol:'Apology',req:'Request',resp:'Response',other:'Other'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}},
  questions:{data:()=>questions,cols:['#','','Kata tanya','Reading','Meaning','Jenis','Level'],types:{what:'What',who:'Who',where:'Where',when:'When',which:'Which',how:'How',why:'Why',howmany:'How many',howmuch:'How much'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{what:'What',who:'Who',where:'Where',when:'When',which:'Which',how:'How',why:'Why',howmany:'How many',howmuch:'How much'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}},
  pronouns:{data:()=>pronouns,cols:['#','','Kata','Reading','Meaning','Jenis','Level'],types:{'1st':'1st person','2nd':'2nd person','3rd':'3rd person',demo:'Demonstrative',other:'Other'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{'1st':'1st person','2nd':'2nd person','3rd':'3rd person',demo:'Demonstrative',other:'Other'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}},
  fillers:{data:()=>fillers,cols:['#','','Kata/Frasa','Reading','Meaning','Type','Level'],types:{filler:'Filler',phrase:'Set phrase',ono:'Onomatopoeia'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{filler:'Filler',phrase:'Set phrase',ono:'Onomatopoeia'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}}
};

let cur='verbs',starFilter=false,starred={},starredDates={},masteryData={};
try{starred=JSON.parse(localStorage.getItem('jp_stars')||'{}');}catch{}
try{starredDates=JSON.parse(localStorage.getItem('jp_star_dates')||'{}');}catch{}
try{masteryData=JSON.parse(localStorage.getItem('jp_mastery')||'{}');}catch{}
function save(){
  try{localStorage.setItem('jp_stars',JSON.stringify(starred));}catch{}
  try{localStorage.setItem('jp_star_dates',JSON.stringify(starredDates));}catch{}
  try{localStorage.setItem('jp_mastery',JSON.stringify(masteryData));}catch{}
}
function mIcon(m){return m==='red'?'🔴':m==='yellow'?'🟡':m==='green'?'🟢':'';}
function setMastery(tab,i,level){
  const k=sk(tab,i);
  if(!starred[k])return;
  masteryData[k]=level||'';
  if(!level)delete masteryData[k];
  save();render();
  document.querySelectorAll('.mc-dropdown.open').forEach(d=>d.classList.remove('open'));
}
function sk(t,i){return t+':'+i;}
function sc(tab,i){
  const k=sk(tab,i);
  const on=starred[k]?'on':'';
  const m=masteryData[k]||'';
  const bubbleCls='mc-bubble'+(m?' has-'+m:'');
  const bubbleIcon=m?mIcon(m):'·';
  const mcHtml=starred[k]?`<div class="mc-wrap">
    <button class="${bubbleCls}" onclick="event.stopPropagation();toggleMcDropdown('${tab}',${i})" title="Mastery level">${bubbleIcon}</button>
    <div class="mc-dropdown" id="mc-dd-${tab}-${i}">
      <button class="mc-opt${m==='red'?' active':''}" onclick="event.stopPropagation();setMastery('${tab}',${i},'red')">🔴 New / Hard</button>
      <button class="mc-opt${m==='yellow'?' active':''}" onclick="event.stopPropagation();setMastery('${tab}',${i},'yellow')">🟡 So-so</button>
      <button class="mc-opt${m==='green'?' active':''}" onclick="event.stopPropagation();setMastery('${tab}',${i},'green')">🟢 Mastered</button>
      ${m?`<button class="mc-opt mc-opt-clear" onclick="event.stopPropagation();setMastery('${tab}',${i},'')">✕ Remove tag</button>`:''}
    </div>
  </div>`:'<div style="width:22px;flex-shrink:0"></div>';
  return`<td class="sc"><button class="sbtn ${on}" onclick="toggleStar('${tab}',${i})">${starred[k]?'★':'☆'}</button></td><td style="width:30px;padding:4px 6px;">${mcHtml}</td>`;
}
function toggleMcDropdown(tab,i){
  const dd=document.getElementById('mc-dd-'+tab+'-'+i);
  if(!dd)return;
  const wasOpen=dd.classList.contains('open');
  document.querySelectorAll('.mc-dropdown.open').forEach(d=>d.classList.remove('open'));
  if(!wasOpen)dd.classList.add('open');
}
document.addEventListener('click',function(){
  document.querySelectorAll('.mc-dropdown.open').forEach(d=>d.classList.remove('open'));
});
function toggleStar(tab,i){
  const k=sk(tab,i);
  const wasStarred = !!starred[k];
  if(starred[k]){ delete starred[k]; delete starredDates[k]; }
  else { starred[k]=1; starredDates[k]=todayKey(); }
  save();render();updateGlobalProgress();
  if(!wasStarred){
    if(typeof touchStreak==='function') touchStreak();
    if(typeof renderStreakNav==='function') renderStreakNav();
  }
  if(typeof renderGoalBar==='function') renderGoalBar();
}
function toggleStarFilter(){
  starFilter=!starFilter;
  if(starFilter){ masteryFilter=''; ['mfRed','mfYellow','mfGreen'].forEach(id=>document.getElementById(id).classList.remove('on')); document.getElementById('sfCombo').classList.remove('color-active'); }
  document.getElementById('sfBtn').classList.toggle('on',starFilter);
  render();
}
function toggleColorDropdown(e){
  e.stopPropagation();
  document.getElementById('sfDropdown').classList.toggle('open');
}
function closeColorDropdown(){
  document.getElementById('sfDropdown').classList.remove('open');
}
document.addEventListener('click',function(e){
  const dd=document.getElementById('sfDropdown');
  if(dd&&!document.getElementById('sfCombo').contains(e.target)) dd.classList.remove('open');
});

let masteryFilter='';
function toggleMasteryFilter(level){
  if(masteryFilter===level){ masteryFilter=''; }
  else { masteryFilter=level; starFilter=false; document.getElementById('sfBtn').classList.remove('on'); }
  document.getElementById('mfRed').classList.toggle('on', masteryFilter==='red');
  document.getElementById('mfYellow').classList.toggle('on', masteryFilter==='yellow');
  document.getElementById('mfGreen').classList.toggle('on', masteryFilter==='green');
  document.getElementById('sfCombo').classList.toggle('color-active', !!masteryFilter);
  render();
}

// ── GACHA ──────────────────────────────────────────────────────────────

// Check if a word object is starred by finding its true index in the source array.
// Stars are stored as sk(tab, originalIndex) by the render/toggleStar system.
function gachaIsStarred(tab, wordObj, sourceArr){
  const idx = sourceArr.indexOf(wordObj);
  if(idx === -1) return false;
  return !!starred[sk(tab, idx)];
}

// Priority pick: ALWAYS pick important words (smallest index) not yet starred.
// 80% guaranteed = top unstarred words, 20% = lightly shuffled from next batch.
function pickNPriority(pool, n, tab, sourceArr){
  const avail = pool.filter(v => !gachaIsStarred(tab, v, sourceArr));
  if(avail.length === 0) return [];
  if(avail.length <= n) return avail;

  const sorted = [...avail].sort((a, b) => sourceArr.indexOf(a) - sourceArr.indexOf(b));

  const guaranteedCount = Math.max(1, Math.floor(n * 0.8));
  const guaranteed = sorted.slice(0, guaranteedCount);
  const remainder = sorted.slice(guaranteedCount).sort(() => Math.random() - 0.5);
  const extra = remainder.slice(0, n - guaranteedCount);

  return [...guaranteed, ...extra];
}

// Untuk "other" pool — same logic, priority by source index.
function pickNOther(pools, n){
  let all = [];
  pools.forEach(({tab, data, sourceArr}) => {
    data.forEach(v => {
      if(!gachaIsStarred(tab, v, sourceArr)) all.push({v, tab, sourceArr});
    });
  });
  if(!all.length) return [];
  if(all.length <= n) return all;

  all.sort((a, b) => a.sourceArr.indexOf(a.v) - b.sourceArr.indexOf(b.v));

  const guaranteedCount = Math.max(1, Math.floor(n * 0.8));
  const guaranteed = all.slice(0, guaranteedCount);
  const remainder = all.slice(guaranteedCount).sort(() => Math.random() - 0.5);
  const extra = remainder.slice(0, n - guaranteedCount);

  return [...guaranteed, ...extra];
}

function rollGacha(){
  const verbPool   = [...verbs];
  const naPool     = adjs.filter(a => a[3] === 'na');
  const iPool      = adjs.filter(a => a[3] === 'i');
  const nounPool   = nouns.filter(n => n[3] !== 'c9');  // same as TABS.nouns.data()

  // ── Distribusi 45 kata ──
  // Verb:      15–18  → ambil 16
  // な-adj:    10–12  → ambil 11
  // い-adj:     5–7   → ambil  6
  // Noun:       3–5   → ambil  4
  // Other:      sisa  → ambil  8  (adv/expression/dll)
  const picked16v  = pickNPriority(verbPool,  16, 'verbs', verbs);
  const picked11na = pickNPriority(naPool,    11, 'adjs',  adjs);
  const picked6i   = pickNPriority(iPool,      6, 'adjs',  adjs);
  const picked4n   = pickNPriority(nounPool,   4, 'nouns', nounPool);  // sourceArr = filtered, matches _i

  // "other" = advs, words, particles, expressions, questions, pronouns, fillers, counters
  const countersArr = nouns.filter(n => n[3] === 'c9');
  const otherPools = [
    {tab:'advs',       data: advs,         sourceArr: advs},
    {tab:'words',      data: words,        sourceArr: words},
    {tab:'particles',  data: particles,    sourceArr: particles},
    {tab:'expressions',data: expressions,  sourceArr: expressions},
    {tab:'questions',  data: questions,    sourceArr: questions},
    {tab:'pronouns',   data: pronouns,     sourceArr: pronouns},
    {tab:'fillers',    data: fillers,      sourceArr: fillers},
    {tab:'counters',   data: countersArr,  sourceArr: countersArr},
  ];

  // Sisa ke 45
  const mainCount = picked16v.length + picked11na.length + picked6i.length + picked4n.length;
  const otherTarget = Math.max(0, 45 - mainCount);
  const picked8o = pickNOther(otherPools, otherTarget);

  const wordRow = (v) =>
    `<div class="gm-word"><span class="gw-k">${v[0]}</span><span class="gw-r">${v[1]}</span><span class="gw-m">${v[2]}</span></div>`;

  const section = (label, emoji, words, rangeHint) => {
    if(!words.length) return `<div class="gm-section"><div class="gm-sec-title">${emoji} ${label} <span style="color:var(--text3);font-size:10px">(not enough new words)</span></div></div>`;
    return `<div class="gm-section">
      <div class="gm-sec-title">${emoji} ${label} — <strong>${words.length}</strong> words <span style="color:var(--text3);font-size:10px;font-weight:400">${rangeHint}</span></div>
      <div class="gm-words">${words.map(v => wordRow(v)).join('')}</div>
    </div>`;
  };

  const otherRows = picked8o.map(({v}) =>
    `<div class="gm-word"><span class="gw-k">${v[0]}</span><span class="gw-r">${v[1]}</span><span class="gw-m">${v[2]}</span></div>`
  ).join('');

  const total = picked16v.length + picked11na.length + picked6i.length + picked4n.length + picked8o.length;

  document.getElementById('gachaBody').innerHTML =
    section('Verb', '🔵', picked16v, '(target 15–18)') +
    section('な-Adjective', '🟣', picked11na, '(target 10–12)') +
    section('い-Adjective', '🟢', picked6i, '(target 5–7)') +
    section('Noun', '🟡', picked4n, '(target 3–5)') +
    (picked8o.length ? `<div class="gm-section">
      <div class="gm-sec-title">🎲 Other Random — <strong>${picked8o.length}</strong> words <span style="color:var(--text3);font-size:10px;font-weight:400">(adv / expression / misc)</span></div>
      <div class="gm-words">${otherRows}</div>
    </div>` : '');

  const todayStarred = Object.values(starredDates).filter(d => d === todayKey()).length;
  document.getElementById('gachaInfo').textContent = `${total} words · today ⭐ ${todayStarred} words`;

  // Store current gacha result with category for rendering
  currentGachaWords = [
    ...picked16v.map(v=>({k:v[0],r:v[1],m:v[2],cat:'verb'})),
    ...picked11na.map(v=>({k:v[0],r:v[1],m:v[2],cat:'na'})),
    ...picked6i.map(v=>({k:v[0],r:v[1],m:v[2],cat:'i'})),
    ...picked4n.map(v=>({k:v[0],r:v[1],m:v[2],cat:'noun'})),
    ...picked8o.map(({v})=>({k:v[0],r:v[1],m:v[2],cat:'other'})),
  ];
}

function hasRolledToday(){
  let lastRoll = '';
  try{ lastRoll = localStorage.getItem('jp_gacha_lastroll') || ''; }catch{}
  return lastRoll === todayKey();
}

function markRolledToday(){
  try{ localStorage.setItem('jp_gacha_lastroll', todayKey()); }catch{}
}

function updateGachaBtn(){
  const btn = document.querySelector('.gachabtn');
  if(!btn) return;
  // Never disable the button — user can always open to view the list
  // Just update the title to indicate roll already done
  if(hasRolledToday()){
    btn.disabled = false;
    btn.style.opacity = '0.7';
    btn.style.cursor = '';
    btn.title = 'View today\'s gacha result';
  } else {
    btn.disabled = false;
    btn.style.opacity = '';
    btn.style.cursor = '';
    btn.title = '';
  }
}

function saveGachaResult(){
  try{ localStorage.setItem('jp_gacha_result_' + todayKey(), JSON.stringify(currentGachaWords)); }catch{}
}

function loadGachaResult(){
  try{
    const raw = localStorage.getItem('jp_gacha_result_' + todayKey());
    return raw ? JSON.parse(raw) : null;
  }catch{ return null; }
}

function renderSavedGacha(words){
  const wordRow = (v) =>
    `<div class="gm-word"><span class="gw-k">${v.k}</span><span class="gw-r">${v.r}</span><span class="gw-m">${v.m}</span></div>`;
  const section = (label, emoji, ws, hint) => {
    if(!ws.length) return '';
    return `<div class="gm-section">
      <div class="gm-sec-title">${emoji} ${label} — <strong>${ws.length}</strong> words <span style="color:var(--text3);font-size:10px;font-weight:400">${hint}</span></div>
      <div class="gm-words">${ws.map(wordRow).join('')}</div>
    </div>`;
  };
  const verbs  = words.filter(w => w.cat === 'verb');
  const na     = words.filter(w => w.cat === 'na');
  const i      = words.filter(w => w.cat === 'i');
  const nouns  = words.filter(w => w.cat === 'noun');
  const others = words.filter(w => w.cat === 'other');
  // fallback: if no cat info (old save), re-roll silently with proper categories
  if(!verbs.length && !na.length && !i.length && !nouns.length){
    rollGacha();
    saveGachaResult();
    return;
  } else {
    document.getElementById('gachaBody').innerHTML =
      section('Verb', '🔵', verbs, '(target 15–18)') +
      section('な-Adjective', '🟣', na, '(target 10–12)') +
      section('い-Adjective', '🟢', i, '(target 5–7)') +
      section('Noun', '🟡', nouns, '(target 3–5)') +
      (others.length ? section('Other Random', '🎲', others, '(adv / expression / misc)') : '');
  }
  const todayStarredS = Object.values(starredDates).filter(d => d === todayKey()).length;
  document.getElementById('gachaInfo').textContent = `${words.length} words · today ⭐ ${todayStarredS} words`;
}

function openGacha(){
  const rollBtn = document.getElementById('gachaRollBtn');
  if(hasRolledToday()){
    // Already rolled — re-run fresh so current stars are always respected
    rollGacha();
    document.getElementById('gmSub').textContent = '🔒 Already rolled today — star the words you\'ve memorized!';
    if(rollBtn){ rollBtn.disabled = true; rollBtn.style.opacity = '0.4'; rollBtn.style.cursor = 'not-allowed'; rollBtn.title = 'Kembali besok!'; }
  } else {
    // New day — show empty state with Roll button
    document.getElementById('gachaBody').innerHTML = `<div style="padding:48px 32px;text-align:center;color:var(--text3);font-size:14px;">
      <div style="font-size:36px;margin-bottom:12px;">🎲</div>
      <div style="font-size:15px;color:var(--text2);margin-bottom:6px;">Gacha not used today</div>
      <div style="font-size:12px;">Click Roll! to get 45 new words</div>
    </div>`;
    document.getElementById('gmSub').textContent = '45 top words not yet starred — star them once you\'ve memorized them!';
    document.getElementById('gachaInfo').textContent = '';
    if(rollBtn){ rollBtn.disabled = false; rollBtn.style.opacity = ''; rollBtn.style.cursor = ''; rollBtn.title = ''; }
  }
  document.getElementById('gachaModal').classList.add('show');
}

function doRoll(){
  rollGacha();
  markRolledToday();
  saveGachaResult();
  updateGachaBtn();
  document.getElementById('gmSub').textContent = '🔒 Already rolled today — star the words you\'ve memorized!';
  const rollBtn = document.getElementById('gachaRollBtn');
  if(rollBtn){ rollBtn.disabled = true; rollBtn.style.opacity = '0.4'; rollBtn.style.cursor = 'not-allowed'; rollBtn.title = 'Kembali besok!'; }
}

function closeGacha(){
  document.getElementById('gachaModal').classList.remove('show');
}
function resetAllStars(){
  if(!confirm("Reset all stars? All words will be marked as unmemorized.")) return;
  starred = {};
  starredDates = {};
  try{ localStorage.removeItem('jp_stars'); }catch{}
  try{ localStorage.removeItem('jp_star_dates'); }catch{}
  updateGlobalProgress();
  render();
  alert("All stars have been reset!");
}



// ── END GACHA ───────────────────────────────────────────────────────────

// ── STUDY PLAN ──────────────────────────────────────────────────────────
let currentGachaWords = [];
let viewWeekOffset = 0;  // 0 = current week, -1 = last week, etc.
let selectedDayKey = null;

function localDateStr(d){
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${dd}`;
}

function todayKey(){
  return localDateStr(new Date());
}

function dateToKey(d){
  return localDateStr(d);
}

function keyToDate(k){
  const [y,m,dd] = k.split('-').map(Number);
  return new Date(y, m-1, dd);
}

function loadPlan(){
  try{ return JSON.parse(localStorage.getItem('jp_study_plan')||'{}'); }catch{ return {}; }
}

function savePlan(plan){
  try{ localStorage.setItem('jp_study_plan', JSON.stringify(plan)); }catch{}
}

function getWeekStart(offset){
  const today = new Date();
  today.setHours(0,0,0,0);
  const day = today.getDay(); // 0=Sun
  const monday = new Date(today);
  monday.setDate(today.getDate() - (day===0?6:day-1) + offset*7);
  return monday;
}

function countAllStarred(){
  return Object.keys(starred).length;
}

function countAllWords(){
  return verbs.length + adjs.length + nouns.length + advs.length + words.length +
    particles.length + expressions.length + questions.length + pronouns.length + fillers.length;
}

function updateGlobalProgress(){
  const s = countAllStarred();
  const t = countAllWords();
  const pct = t>0?Math.round(s/t*100):0;
  document.getElementById('gpStarCount').textContent = s;
  document.getElementById('gpTotal').textContent = t;
}

function openPlan(){
  viewWeekOffset = 0;
  selectedDayKey = todayKey();
  renderPlan();
  renderReview();
  document.getElementById('planModal').classList.add('show');
}
function closePlan(){
  document.getElementById('planModal').classList.remove('show');
}

function changeWeek(dir){
  if(dir===0){ viewWeekOffset=0; selectedDayKey=todayKey(); }
  else viewWeekOffset += dir;
  renderPlan();
}

function renderPlan(){
  const plan = loadPlan();
  const todayStr = todayKey();
  const s = countAllStarred();
  const t = countAllWords();
  const pct = t>0?Math.round(s/t*100):0;

  // 3-day drill notification
  const todayDate = keyToDate(todayStr);
  const todayDayNum = Math.round((todayDate - EPOCH)/(1000*60*60*24)) + 1;
  const notifEl = document.getElementById('drillNotif');
  if(notifEl && todayDayNum > 0 && todayDayNum % 3 === 0){
    // Count starred from last 3 days
    let count3 = 0;
    for(let i=1;i<=3;i++){
      const pd=new Date(todayDate); pd.setDate(todayDate.getDate()-i);
      const pk=dateToKey(pd);
      count3 += Object.values(starredDates).filter(v=>v===pk).length;
    }
    if(count3>0){
      notifEl.style.display='flex';
      document.getElementById('drillNotifTitle').textContent = `Time for 3-Day Review! (Day ${todayDayNum})`;
      document.getElementById('drillNotifDesc').textContent = `${count3} words from the past 3 days ready to drill.`;
    } else { notifEl.style.display='none'; }
  } else if(notifEl){ notifEl.style.display='none'; }

  document.getElementById('planGpStar').textContent = s;
  document.getElementById('planGpStarred').textContent = s;
  document.getElementById('planGpTotal').textContent = t;
  document.getElementById('planGpPct').textContent = pct;
  document.getElementById('planGpBar').style.width = pct+'%';

  const weekStart = getWeekStart(viewWeekOffset);
  const weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate()+6);

  const fmt = (d) => d.toLocaleDateString('en-US',{day:'numeric',month:'short'});
  document.getElementById('weekLabel').textContent =
    viewWeekOffset===0 ? 'This Week' : viewWeekOffset===-1 ? 'Last Week' : `Week ${viewWeekOffset>0?'+':''}${viewWeekOffset}`;
  document.getElementById('weekRange').textContent = `${fmt(weekStart)} – ${fmt(weekEnd)}`;

  document.getElementById('prevWeekBtn').disabled = false;
  document.getElementById('nextWeekBtn').disabled = false;

  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  let gridHtml = '';

  for(let i=0;i<7;i++){
    const d = new Date(weekStart); d.setDate(weekStart.getDate()+i);
    const dk = dateToKey(d);
    const dayData = plan[dk];
    const isToday = dk===todayStr;
    const isSelected = dk===selectedDayKey;
    // Count starred words for this day
    const wordCount = Object.values(starredDates).filter(v=>v===dk).length;
    const dayNum = Math.round((d - EPOCH)/(1000*60*60*24)) + 1;
    const is3dayReview = dayNum > 0 && (dayNum % 3 === 0);

    let cardClass = 'day-card';
    if(isSelected) cardClass += ' active';
    if(isToday) cardClass += ' today';
    if(is3dayReview && dayNum>0) cardClass += ' drill-day';
    if(wordCount>0) cardClass += ' has-words';

    const badge = is3dayReview && dayNum>0 ? `<span class="dc-badge drill">Review</span>` : '';

    gridHtml += `<div class="${cardClass}" onclick="selectDay('${dk}')">
      ${badge}
      <div class="dc-label">${days[i]}</div>
      <div class="dc-day">${d.getDate()}</div>
      <div class="dc-count">${dayNum>0?'Day '+dayNum:'?'}${wordCount>0?' · '+wordCount+'★':''}</div>
    </div>`;
  }
  document.getElementById('daysGrid').innerHTML = gridHtml;
  renderDayDetail(selectedDayKey);
}

function selectDay(dk){
  selectedDayKey = dk;
  renderPlan();
}

function renderDayDetail(dk){
  const todayStr = todayKey();
  const d = keyToDate(dk);
  const thisDayNum = Math.round((d - EPOCH)/(1000*60*60*24)) + 1;
  const isToday = dk===todayStr;
  const dateLabel = d.toLocaleDateString('en-US',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

  // Get starred words for this specific day from starredDates
  const TABS_DATA = {verbs, adjs, advs, nouns, words, particles, expressions, questions, pronouns, fillers};
  const dayWords = [];
  Object.entries(starred).forEach(([key]) => {
    if(starredDates[key] === dk){
      const [tab, idxStr] = key.split(':');
      const idx = parseInt(idxStr);
      const arr = TABS_DATA[tab];
      if(arr && arr[idx]) dayWords.push({k:arr[idx][0], r:arr[idx][1], m:arr[idx][2], mstry:masteryData[key]||''});
    }
  });

  // Is this a 3-day review point?
  const is3dayReview = thisDayNum > 0 && (thisDayNum % 3 === 0);

  // Collect starred words from the 3 days before this
  let reviewGroups = [];
  if(is3dayReview){
    for(let back=thisDayNum-1; back>=Math.max(1,thisDayNum-3); back--){
      const pastDate = new Date(EPOCH); pastDate.setDate(EPOCH.getDate()+(back-1));
      const pastKey = dateToKey(pastDate);
      const wds = [];
      Object.entries(starred).forEach(([key]) => {
        if(starredDates[key]===pastKey){
          const [tab,idxStr]=key.split(':'); const idx=parseInt(idxStr);
          const arr=TABS_DATA[tab];
          if(arr&&arr[idx]) wds.push({k:arr[idx][0],r:arr[idx][1],m:arr[idx][2],mstry:masteryData[key]||''});
        }
      });
      if(wds.length) reviewGroups.push({dayNum:back, dayKey:pastKey, words:wds});
    }
    reviewGroups.reverse();
  }

  let html = `<div class="day-detail">
    <div class="dd-head">
      <div class="dd-title">${dateLabel}${isToday?' <span style="color:var(--accent);font-size:11px">· Today</span>':''} <span style="font-size:10px;color:var(--text3);margin-left:4px;">Day ${thisDayNum>0?thisDayNum:'?'}</span></div>
    </div>`;

  // 3-day review alert
  if(is3dayReview && reviewGroups.length){
    const total3 = reviewGroups.reduce((a,g)=>a+g.words.length,0);
    let rNum=1;
    html += `<div style="border-bottom:1px solid var(--border);padding:10px 16px;background:rgba(245,184,66,.04);">
      <div style="font-size:11px;font-weight:600;color:#f5c842;letter-spacing:.05em;text-transform:uppercase;margin-bottom:8px;">⚡ 3-Day Review · ${total3} words (Day ${thisDayNum-3} – Day ${thisDayNum-1})</div>`;
    reviewGroups.forEach(group=>{
      const gd=keyToDate(group.dayKey);
      const gLabel=gd.toLocaleDateString('en-US',{weekday:'short',day:'numeric',month:'short'});
      html+=`<div style="margin-bottom:6px;"><div style="font-size:10px;color:var(--text3);margin-bottom:3px;">Day ${group.dayNum} · ${gLabel}</div>`;
      group.words.forEach(w=>{
        html+=`<div class="dd-word-row" style="grid-template-columns:24px 18px 1fr 1fr 1fr;">
          <span class="dd-wnum">${rNum++}</span><span style="font-size:12px">${mIcon(w.mstry)}</span><span class="dd-wk">${w.k}</span>
          <span class="dd-wr">${w.r}</span><span class="dd-wm">${w.m}</span></div>`;
      });
      html+=`</div>`;
    });
    html+=`</div>`;
  }

  // This day's starred words
  if(!dayWords.length){
    html += `<div style="padding:24px;text-align:center;color:var(--text3);font-size:13px;">
      ${isToday?'No words starred today. Star words from the main table!':'No words starred on this day.'}
    </div>`;
  } else {
    html += `<div style="padding:7px 16px 5px;font-size:11px;color:var(--text2);"><strong style="color:var(--text)">${dayWords.length}</strong> words starred today</div>
    <div class="dd-words">`;
    dayWords.forEach((w,i)=>{
      html+=`<div class="dd-word-row" style="grid-template-columns:24px 18px 1fr 1fr 1fr;">
        <span class="dd-wnum">${i+1}</span><span style="font-size:12px">${mIcon(w.mstry)}</span><span class="dd-wk">${w.k}</span>
        <span class="dd-wr">${w.r}</span><span class="dd-wm">${w.m}</span></div>`;
    });
    html+=`</div>`;
  }
  html += `</div>`;
  document.getElementById('dayDetail').innerHTML = html;
}

// ── REVIEW HISTORY ──────────────────────────────────────────────────────
let reviewMode = 'all';

function setReview(mode, btn){
  reviewMode = mode;
  document.querySelectorAll('.rv-pick').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderReview();
}

// Build grouped history from starredDates
// starredDates: { 'tab:idx': 'YYYY-MM-DD' }
// starred: { 'tab:idx': 1 }
function getStarredWordsByDate(){
  // Map: dateKey -> [{k,r,m}]
  const byDate = {};
  const TABS_DATA = {
    verbs, adjs, advs, nouns, words, particles, expressions, questions, pronouns, fillers
  };
  Object.entries(starred).forEach(([key]) => {
    const [tab, idxStr] = key.split(':');
    const idx = parseInt(idxStr);
    const dateKey = starredDates[key] || 'unknown';
    const arr = TABS_DATA[tab];
    if(!arr || !arr[idx]) return;
    const v = arr[idx];
    if(!byDate[dateKey]) byDate[dateKey] = [];
    byDate[dateKey].push({k:v[0], r:v[1], m:v[2], mstry:masteryData[key]||''});
  });
  return byDate;
}

function renderReview(){
  const today = new Date(); today.setHours(0,0,0,0);

  let cutoff = null;
  if(reviewMode === 'month'){
    cutoff = new Date(today); cutoff.setDate(today.getDate()-30);
  } else if(reviewMode === 'week'){
    cutoff = new Date(today); cutoff.setDate(today.getDate()-7);
  } else if(reviewMode === '3days'){
    cutoff = new Date(today); cutoff.setDate(today.getDate()-3);
  }

  const byDate = getStarredWordsByDate();
  const allKeys = Object.keys(byDate).filter(k=>k!=='unknown').sort();
  const filtered = allKeys.filter(k => {
    if(!cutoff) return true;
    return keyToDate(k) >= cutoff;
  });

  // Also include 'unknown' starred (starred before date tracking) in 'all' mode
  const unknownWords = (reviewMode==='all' && byDate['unknown']) ? byDate['unknown'] : [];

  const totalWords = filtered.reduce((a,k)=>a+byDate[k].length,0) + unknownWords.length;
  const totalDays = filtered.length;

  const rangeLabel = {all:'All time',month:'Last 30 days',week:'Last 7 days','3days':'Last 3 days'}[reviewMode]||'';
  document.getElementById('rvSummary').innerHTML = totalWords
    ? `<strong>${totalWords}</strong> words starred · ${rangeLabel}`
    : `No data yet · ${rangeLabel}`;

  if(!totalWords){
    document.getElementById('rvBody').innerHTML = `<div class="rv-empty">No words starred in this range.</div>`;
    return;
  }
  let globalNum = 1;
  let html = '';

  // Unknown date group (legacy stars)
  if(unknownWords.length){
    const id = 'rvg-unknown';
    html += `<div class="rv-group open" id="${id}">
      <div class="rv-group-head" onclick="toggleRvGroup('${id}')">
        <span class="rv-group-label">⭐ Starred previously</span>
        <span class="rv-group-count">${unknownWords.length} words</span>
      </div>
      <div class="rv-group-words">`;
    unknownWords.forEach(w=>{
      html += `<div class="rv-word">
        <span class="rv-wnum">${globalNum++}</span>
        <span style="font-size:12px;width:18px;flex-shrink:0">${mIcon(w.mstry)}</span>
        <span class="rv-wk">${w.k}</span>
        <span class="rv-wr">${w.r}</span>
        <span class="rv-wm">${w.m}</span>
      </div>`;
    });
    html += `</div></div>`;
  }

  filtered.forEach(dk => {
    const d = keyToDate(dk);
    const dayNum = Math.round((d - EPOCH)/(1000*60*60*24)) + 1;
    const label = d.toLocaleDateString('en-US',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
    const wds = byDate[dk];
    const id = 'rvg-'+dk;
    html += `<div class="rv-group open" id="${id}">
      <div class="rv-group-head" onclick="toggleRvGroup('${id}')">
        <span class="rv-group-label">${dayNum>0?'Day '+dayNum+' · ':''}${label}</span>
        <span class="rv-group-count">${wds.length} words</span>
      </div>
      <div class="rv-group-words">`;
    wds.forEach(w=>{
      html += `<div class="rv-word">
        <span class="rv-wnum">${globalNum++}</span>
        <span style="font-size:12px;width:18px;flex-shrink:0">${mIcon(w.mstry)}</span>
        <span class="rv-wk">${w.k}</span>
        <span class="rv-wr">${w.r}</span>
        <span class="rv-wm">${w.m}</span>
      </div>`;
    });
    html += `</div></div>`;
  });

  document.getElementById('rvBody').innerHTML = html;
}

function toggleRvGroup(id){
  document.getElementById(id).classList.toggle('open');
}
// ══════════════════════════════════════════════════
// COUNTDOWN SYSTEM
// ══════════════════════════════════════════════════

