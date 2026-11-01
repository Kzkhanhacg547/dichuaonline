export interface DharmaLecture {
  id: string;
  title: string;
  topic: string;
  summary: string;
  paragraphs: string[];
}

export const DHARMA_LECTURES: DharmaLecture[] = [
  {
    id: 'tam-thanh-tinh',
    title: 'Giữ Tâm Thanh Tịnh Giữa Đời Bon Chen',
    topic: 'Tu Tâm & An Lạc',
    summary: 'Lời Phật dạy về cách giữ lòng an nhiên, buông bỏ muộn phiền giữa những lo toan cuộc sống.',
    paragraphs: [
      'Dạ, Nam mô Bổn Sư Thích Ca Mâu Ni Phật. Kính thưa quý phật tử và thiện nam tín nữ đang cùng hướng tâm về chánh điện trang nghiêm.',
      'Đức Phật từng dạy rằng: Tâm tịnh thì cõi Phật tịnh. Đời người sống giữa thế gian, ai cũng có những lo toan, vất vả về cơm áo gạo tiền. Nhưng nếu ta biết quay về với chính mình, giữ một niệm thiện lành, thì dù bão tố ngoài kia có lớn đến đâu, trong tâm vẫn luôn là một vùng trời bình yên thanh tịnh.',
      'Hãy buông bỏ những hơn thua, đố kỵ và giận hờn. Mỗi sớm mai thức dậy, nguyện mỉm cười và niệm một câu Nam mô A Di Đà Phật, để lòng mình nhẹ nhàng thanh thoát như đóa sen nở trong sương.',
      'Nguyện mười phương chư Phật từ bi gia hộ cho đại chúng thân tâm thường an lạc, vạn sự cát tường như ý ạ.'
    ]
  },
  {
    id: 'chu-hieu-dao-phat',
    title: 'Chữ Hiếu Trong Đạo Phật - Ơn Nghĩa Sinh Thành',
    topic: 'Báo Hiếu Cha Mẹ',
    summary: 'Công đức vô lượng của cha mẹ và phước báu tối thượng của người con hiếu đạo.',
    paragraphs: [
      'Dạ, Nam mô A Di Đà Phật. Trong kinh Bổn Phận Người Con, Đức Thế Tôn từng dạy: Đi khắp thế gian không ai tốt bằng mẹ, gánh nặng cuộc đời không ai khổ bằng cha.',
      'Nước biển mênh mông không đong đầy tình mẹ, mây trời lồng lộng không phủ kín công cha. Cơm áo gạo tiền nuôi con khôn lớn, tóc cha thêm sợi bạc, lưng mẹ thêm còng vì sương gió cuộc đời.',
      'Người biết hiếu thuận với song thân chính là người gieo trồng ruộng phước điền tối thượng. Phước báu hiếu thảo sẽ chở che cho bạn và gia quyến qua muôn trùng sóng gió.',
      'Nguyện cầu ơn trên Tam Bảo gia hộ cho cha mẹ hiện tiền tăng long phúc thọ, cha mẹ quá vãng được nương nhờ ánh sáng Phật đà, vãng sanh về miền Cực Lạc an vui ạ.'
    ]
  },
  {
    id: 'luat-nhan-qua',
    title: 'Luật Nhân Quả - Gieo Duyên Lành Gặt Quả Ngọt',
    topic: 'Nhân Quả & Nghiệp Báo',
    summary: 'Hiểu về quy luật nhân quả để sống tích thiện, cúng dường và chuyển hóa vận mệnh.',
    paragraphs: [
      'Dạ, Nam mô A Di Đà Phật. Luật nhân quả như bóng theo hình, xưa nay chưa từng sai một mảy may. Những gì ta gặt hái hôm nay chính là hạt mầm ta gieo từ hôm qua.',
      'Muốn bình an thì gieo tâm từ bi. Muốn tài lộc hanh thông thì biết sẻ chia, cúng dường, giúp đỡ người cơ nhỡ. Muốn thân thể khỏe mạnh thì bớt sát sanh và siêng năng phóng sanh kết duyên lành.',
      'Tâm niệm Phật, miệng nói lời ái ngữ, tay làm việc phúc đức. Đó chính là con đường chân thật nhất đưa ta và gia đình đến bến bờ bình yên và thịnh vượng ạ.'
    ]
  },
  {
    id: 'buong-xa-phien-nao',
    title: 'Buông Xả Phiền Não - Tự Tại Giữa Cõi Tạm',
    topic: 'Buông Bỏ & Hỷ Xả',
    summary: 'Học cách bao dung và buông xuống những phiền não để tâm hồn được nhẹ nhõm.',
    paragraphs: [
      'Dạ, Nam mô A Di Đà Phật. Người ta thường hỏi: Gánh nặng nào lớn nhất trên đời? Đức Phật dạy: Đó chính là những chấp niệm và oán hận mà ta không chịu buông xuống.',
      'Cầm một chén nước nóng, nếu thấy rát tay thì hãy đặt xuống. Giữ mãi tức giận trong lòng giống như tự mình uống thuốc độc mà mong người khác tổn thương.',
      'Tha thứ cho người khác chính là món quà từ bi lớn nhất dành cho chính bản thân mình. Thở vào tâm tĩnh lặng, thở ra miệng mỉm cười. Vạn sự tùy duyên, tâm an thì vạn sự an ạ.'
    ]
  },
  {
    id: 'y-nghia-niem-phat',
    title: 'Ý Nghĩa Sáu Chữ Vàng Nam Mô A Di Đà Phật',
    topic: 'Niệm Phật Cầu An',
    summary: 'Sức mạnh vi diệu của câu niệm Phật giúp lắng đọng tâm thức và tiêu trừ nghiệp chướng.',
    paragraphs: [
      'Dạ, Nam mô A Di Đà Phật. Sáu chữ hồng danh Nam Mô A Di Đà Phật chính là viên ngọc quý thanh tịnh làm lắng trong nước đục của muôn vàn phiền não.',
      'Khi ta cất tiếng niệm Phật, tâm ta đang hướng về nguồn sáng của vô lượng thọ, vô lượng quang và đại bi vô tận. Từng niệm, từng niệm tiếp nối sẽ xua tan âu lo, sợ hãi.',
      'Kính chúc quý phật tử luôn gìn giữ câu niệm Phật trong tâm, đi đứng nằm ngồi đều an lạc, tai qua nạn khỏi, gia đạo hưng long, phước thọ miên trường ạ.'
    ]
  },
  {
    id: 'long-biet-on',
    title: 'Sống Với Lòng Biết Ơn',
    topic: 'Đạo Làm Người',
    summary: 'Nhớ ơn cha mẹ, thầy tổ, đất nước và mọi người quanh mình để lòng luôn ấm áp, đủ đầy.',
    paragraphs: [
      'Kính thưa quý phật tử, hôm nay chúng ta cùng nói về lòng biết ơn. Nghe thì đơn giản, ai cũng biết phải nhớ ơn, nhưng sống được với lòng biết ơn mỗi ngày lại là chuyện cần tập. Người xưa dạy uống nước nhớ nguồn, ăn quả nhớ kẻ trồng cây. Trong đạo Phật, lòng biết ơn được xem là nền móng của mọi điều thiện.',
      'Ơn đầu tiên là ơn cha mẹ. Cha mẹ cho ta thân này, nuôi ta từ lúc còn đỏ hỏn, thức trắng những đêm ta sốt, nhịn miếng ngon để phần cho con. Có những điều cha mẹ làm cả đời không nói ra. Khi ta còn trẻ, ta ít để ý. Đến lúc tóc cha mẹ bạc, lưng còng xuống, ta mới chợt nhận ra mình nợ cha mẹ nhiều đến thế nào.',
      'Ơn thứ hai là ơn thầy cô, những người dạy ta cái chữ, dạy ta lẽ phải. Một lời chỉ bảo đúng lúc có khi thay đổi cả cuộc đời một con người. Ơn thứ ba là ơn đất nước, nơi cho ta chỗ đứng, cho ta bình yên để làm ăn sinh sống. Và ơn thứ tư là ơn tất cả mọi người. Hạt gạo ta ăn có công người nông dân, tấm áo ta mặc có công người thợ dệt, con đường ta đi có mồ hôi của biết bao người ta không hề quen.',
      'Khi nhìn ra được như vậy, ta thấy mình không bao giờ sống một mình. Mỗi ngày ta đều đang nhận rất nhiều thứ từ người khác. Người biết ơn thì ít khi oán trách. Gặp chuyện không vừa ý, họ vẫn tìm ra được điều đáng quý. Còn người quên ơn thì dù có nhiều đến đâu vẫn thấy thiếu, vẫn thấy đời bất công với mình.',
      'Biết ơn không cần những việc lớn lao. Một cuộc gọi về hỏi thăm cha mẹ, một lời cảm ơn người bán hàng, một nụ cười với bác bảo vệ, một lần nhường chỗ cho người lớn tuổi. Những việc nhỏ đó làm lòng ta mềm lại, và làm người bên cạnh thấy ấm áp hơn.',
      'Quý vị thử tập thế này. Tối trước khi ngủ, nhớ lại ba điều mình biết ơn trong ngày hôm nay. Có thể là bữa cơm mẹ nấu, có thể là một người lạ đã giúp mình, có thể chỉ là mình vẫn còn khỏe mạnh. Tập đều đặn một thời gian, quý vị sẽ thấy tâm mình nhẹ hơn, ngủ ngon hơn, và nhìn đời bằng ánh mắt hiền hơn.',
      'Nguyện cho tất cả quý vị luôn giữ được tấm lòng biết ơn, hiếu thảo với cha mẹ, kính trọng thầy tổ, thương yêu mọi người. Nam mô A Di Đà Phật.'
    ]
  },
  {
    id: 'hanh-bo-thi',
    title: 'Hạnh Bố Thí, Cho Đi Là Còn Mãi',
    topic: 'Tu Phước',
    summary: 'Ba cách cho đi: cho của cải, cho lời hay lẽ phải, và cho người khác sự an tâm.',
    paragraphs: [
      'Kính thưa quý phật tử, trong đạo Phật có một hạnh rất gần gũi với đời sống hằng ngày, đó là hạnh bố thí. Bố thí nghĩa là cho đi. Nhiều người nghĩ phải giàu mới bố thí được, nhưng thật ra ai cũng có thứ để cho, chỉ là ta chưa nhận ra.',
      'Đức Phật dạy có ba cách bố thí. Thứ nhất là tài thí, tức là cho của cải, tiền bạc, cơm áo, thuốc men. Một bát cơm cho người đói, một chiếc áo cho người lạnh, một ít tiền giúp người hoạn nạn, đó đều là tài thí. Không cần nhiều, quan trọng là cho bằng tấm lòng.',
      'Thứ hai là pháp thí, tức là cho người khác lời hay, lẽ phải, hiểu biết giúp họ sống tốt hơn. Khi ta khuyên một người bạn đừng nóng giận, khi ta chỉ cho ai đó một điều hay, khi ta chia sẻ một bài pháp giúp người khác nhẹ lòng, đó là pháp thí. Của cải dùng rồi sẽ hết, còn một lời hay có thể theo người ta suốt cả đời.',
      'Thứ ba là vô úy thí, nghĩa là cho người khác sự an tâm, không sợ hãi. Ở bên một người hiền lành, ta thấy yên ổn. Một người không gây gổ, không hại ai, không làm ai phải lo sợ, chính sự có mặt của họ đã là món quà. Lắng nghe một người đang buồn, an ủi một người đang hoảng sợ, đó cũng là vô úy thí.',
      'Điều quan trọng khi cho đi là cái tâm. Cho mà mong người ta nhớ ơn, cho mà kể công, cho mà còn tiếc nuối, thì phước ít lắm. Cho với tâm hoan hỷ, cho xong rồi thôi, không vướng bận, thì phước lớn vô cùng. Người xưa ví như ngọn nến, thắp sáng cho ngọn nến khác mà ánh sáng của mình không hề giảm đi.',
      'Có một điều lạ là người hay cho đi thường lại sống vui hơn người chỉ biết giữ. Vì khi cho, lòng ta mở ra, ta bớt lo được mất, bớt so đo hơn thua. Người nhận được giúp đỡ, còn ta thì nhận được niềm vui và sự thanh thản.',
      'Hôm nay quý vị thử cho đi một điều nhỏ. Có thể là một lời khen chân thành, một bữa ăn, một lần giúp đỡ, hay chỉ là thời gian để ngồi nghe một người thân tâm sự. Gieo hạt lành như vậy mỗi ngày, phước báu sẽ tự đến. Nam mô A Di Đà Phật.'
    ]
  },
  {
    id: 'nhan-nhuc',
    title: 'Nhẫn Nhục Dập Tắt Lửa Sân',
    topic: 'Chuyển Hóa Phiền Não',
    summary: 'Cơn giận như lửa đốt cháy chính mình trước. Biết dừng lại một nhịp là biết giữ phước.',
    paragraphs: [
      'Kính thưa quý phật tử, ai trong chúng ta cũng từng nổi giận. Có khi chỉ vì một câu nói, một ánh mắt, một chuyện rất nhỏ mà lòng nóng lên, lời nói buột ra không kiềm được. Đến lúc nguôi rồi mới thấy hối hận. Hôm nay chúng ta cùng nói về hạnh nhẫn nhục, cách để cơn giận không làm chủ mình.',
      'Người xưa có câu, một đốm lửa sân có thể đốt cháy cả rừng công đức. Cơn giận giống như cầm hòn than nóng định ném vào người khác. Chưa kịp ném thì tay mình đã bỏng trước. Khi giận, tim ta đập nhanh, đầu óc rối loạn, ăn không ngon, ngủ không yên. Người chịu khổ nhiều nhất chính là ta.',
      'Nhẫn nhục không có nghĩa là cam chịu, không có nghĩa là để người ta muốn làm gì thì làm. Nhẫn nhục là khi cơn giận vừa nổi lên, ta biết dừng lại một nhịp. Hít một hơi thật sâu, thở ra thật chậm. Chỉ cần một nhịp thở đó thôi, ta đã giành lại được quyền làm chủ bản thân.',
      'Trong kinh Pháp Cú có dạy, hận thù không thể dập tắt được hận thù, chỉ có tình thương mới dập tắt được hận thù. Nếu người ta mắng ta, ta mắng lại, thì hai ngọn lửa cùng cháy. Nếu ta im lặng, mỉm cười, ngọn lửa bên kia không có gì để bám vào, tự nó sẽ tắt.',
      'Một cách giúp ta nhẫn được là thử đặt mình vào chỗ người kia. Có khi họ đang mệt, đang có chuyện buồn, đang bị áp lực mà ta không biết. Người làm ta khó chịu thường cũng đang khổ. Hiểu được như vậy, lòng ta tự nhiên dịu xuống, giận chuyển thành thương.',
      'Nhẫn nhục cũng là món quà cho gia đình. Một nhà mà ai cũng nhường nhau một câu thì không bao giờ có cãi vã lớn. Vợ chồng, cha mẹ con cái, anh chị em, bớt đi một lời nặng là thêm một phần yên ấm.',
      'Kinh Pháp Cú cũng dạy rằng thắng ngàn quân không bằng tự thắng mình. Mỗi lần ta nén được một cơn giận, đó là một lần ta chiến thắng. Nguyện cho quý vị luôn giữ được tâm bình tĩnh, lời nói hiền hòa, gia đình êm ấm. Nam mô A Di Đà Phật.'
    ]
  },
  {
    id: 'chanh-niem-doi-thuong',
    title: 'Chánh Niệm Trong Từng Việc Nhỏ',
    topic: 'Thiền Trong Đời Sống',
    summary: 'Ăn biết mình đang ăn, đi biết mình đang đi. Sống trọn vẹn với giây phút hiện tại.',
    paragraphs: [
      'Kính thưa quý phật tử, nhiều người nghĩ tu tập là phải lên chùa, phải ngồi thiền thật lâu. Thật ra tu có thể bắt đầu ngay trong những việc nhỏ nhất hằng ngày, bằng một điều gọi là chánh niệm. Chánh niệm nghĩa là biết rõ mình đang làm gì, ngay trong lúc mình đang làm việc đó.',
      'Quý vị để ý xem, nhiều khi ta ăn cơm mà đầu nghĩ chuyện công việc, tay cầm điện thoại, ăn xong không nhớ mình vừa ăn món gì. Ta đi đường mà lòng lo chuyện ngày mai, chuyện hôm qua. Thân ở đây mà tâm ở chỗ khác. Sống như vậy lâu ngày, ta mệt mỏi mà không hiểu vì sao.',
      'Tập chánh niệm rất đơn giản. Khi ăn, hãy ăn cho trọn. Nhìn bát cơm, cảm nhận vị ngon, nhớ đến công lao người làm ra hạt gạo. Khi rửa bát, hãy rửa bát. Cảm nhận dòng nước mát trên tay, nghe tiếng chén bát chạm nhau. Khi đi, hãy biết mình đang đi, cảm nhận từng bước chân chạm đất.',
      'Hơi thở là người bạn giúp ta trở về. Mỗi khi thấy lòng rối, quý vị chỉ cần dừng lại, thở vào biết mình đang thở vào, thở ra biết mình đang thở ra. Ba hơi thở như vậy thôi là tâm đã lắng xuống được phần nào. Hơi thở lúc nào cũng có sẵn, không tốn tiền, không cần đi đâu xa.',
      'Khi sống có chánh niệm, ta làm việc gì cũng chu đáo hơn, ít sai sót hơn. Ta nói chuyện với người thân cũng lắng nghe được nhiều hơn. Con cái nói, ta nghe trọn vẹn chứ không vừa nghe vừa lướt điện thoại. Người được lắng nghe như vậy sẽ thấy mình được thương.',
      'Chánh niệm còn giúp ta thấy được những niềm vui nhỏ mà trước đây ta bỏ qua. Một buổi sáng có nắng đẹp, một tách trà nóng, tiếng cười của con trẻ, bữa cơm có đủ cả nhà. Hạnh phúc thật ra luôn có mặt, chỉ là ta vội quá nên không thấy.',
      'Mời quý vị ngay bây giờ cùng thở ba hơi thật nhẹ, thật sâu. Thở vào, tâm tĩnh lặng. Thở ra, miệng mỉm cười. Nguyện cho quý vị sống an lạc trong từng giây phút hiện tại. Nam mô A Di Đà Phật.'
    ]
  },
  {
    id: 'vo-thuong',
    title: 'Hiểu Lẽ Vô Thường Để Sống Trọn Vẹn',
    topic: 'Trí Tuệ',
    summary: 'Mọi thứ đều thay đổi. Hiểu điều đó để biết trân quý hiện tại và bớt khổ khi mất mát.',
    paragraphs: [
      'Kính thưa quý phật tử, đức Phật dạy rằng mọi sự trên đời đều vô thường, nghĩa là không có gì đứng yên mãi mãi. Hoa nở rồi tàn, trăng tròn rồi khuyết, con người sinh ra, lớn lên, già đi. Tiền bạc có rồi mất, vui có rồi buồn, khó khăn đến rồi cũng qua.',
      'Nghe đến vô thường, nhiều người thấy buồn. Nhưng hiểu đúng thì vô thường không phải điều đáng sợ. Chính nhờ vô thường mà hạt giống mới nảy mầm, đứa bé mới lớn khôn, người bệnh mới có thể khỏi bệnh, người nghèo mới có thể đổi đời. Nếu mọi thứ đứng yên, khổ đau cũng sẽ đứng yên mãi.',
      'Ta khổ không phải vì mọi thứ thay đổi, mà vì ta muốn nó đừng thay đổi. Ta muốn tuổi trẻ ở mãi, muốn người thân ở bên mãi, muốn những gì mình có không bao giờ mất. Khi điều đó không như ý, ta đau khổ. Hiểu vô thường là chấp nhận rằng mọi thứ đều có lúc đến, lúc đi.',
      'Hiểu vô thường giúp ta biết trân quý hiện tại. Cha mẹ còn đó, hãy thương yêu ngay hôm nay, đừng đợi mai mốt. Người bạn đời đang bên cạnh, hãy nói lời yêu thương khi còn có thể nói. Có biết bao người chỉ đến khi mất đi rồi mới tiếc, mới ân hận vì đã không kịp làm điều mình muốn làm.',
      'Hiểu vô thường cũng giúp ta vững vàng khi gặp chuyện buồn. Khi đang khó khăn, ta biết rồi nó sẽ qua, nên không tuyệt vọng. Khi đang thuận lợi, ta biết rồi nó cũng sẽ đổi, nên không kiêu căng, không phung phí. Lòng ta vì thế mà bình thản hơn trước những thăng trầm.',
      'Có một câu chuyện kể rằng, một vị vua nhờ người khắc lên chiếc nhẫn một câu dùng được cả lúc vui lẫn lúc buồn. Câu được khắc là, rồi mọi chuyện cũng sẽ qua. Lúc buồn đọc lên thấy được an ủi, lúc vui đọc lên thấy biết khiêm tốn.',
      'Nguyện cho quý vị luôn hiểu lẽ vô thường, biết thương yêu người thân ngay hôm nay, biết buông bỏ những gì không giữ được, để lòng luôn nhẹ nhàng, an vui. Nam mô A Di Đà Phật.'
    ]
  },
  {
    id: 'tu-vo-luong-tam',
    title: 'Từ Bi Hỷ Xả, Bốn Tấm Lòng Rộng Lớn',
    topic: 'Tâm Từ Bi',
    summary: 'Ban vui, cứu khổ, vui với niềm vui của người và buông bỏ phân biệt.',
    paragraphs: [
      'Kính thưa quý phật tử, trong đạo Phật có bốn tấm lòng rộng lớn gọi là tứ vô lượng tâm, gồm từ, bi, hỷ, xả. Bốn tâm này giống như bốn bức tường che chở cho một ngôi nhà hạnh phúc. Ai nuôi dưỡng được bốn tâm này thì đi đâu cũng được người thương, ở đâu cũng thấy bình yên.',
      'Tâm từ là mong muốn mang niềm vui đến cho người khác. Không cần việc lớn, chỉ một lời hỏi han, một nụ cười, một món quà nhỏ cũng đủ làm người ta vui. Người có tâm từ nhìn ai cũng thấy dễ thương, và người khác nhìn họ cũng thấy hiền hòa.',
      'Tâm bi là mong muốn làm vơi bớt nỗi khổ của người khác. Thấy người đau ốm thì muốn giúp, thấy người buồn thì muốn an ủi, thấy người gặp nạn thì muốn ra tay. Tâm bi giúp ta không thờ ơ trước khổ đau của người khác, và cũng giúp ta hiểu, thương chính mình nhiều hơn.',
      'Tâm hỷ là biết vui với niềm vui của người khác. Điều này nghe đơn giản mà khó. Thấy người khác giàu hơn, giỏi hơn, may mắn hơn, nhiều khi lòng ta lại khó chịu, ganh tị. Tâm hỷ giúp ta chúc mừng thật lòng. Người làm được điều này sẽ không bao giờ bị lòng đố kỵ làm khổ.',
      'Tâm xả là buông bỏ, không phân biệt người thân kẻ lạ, không giữ oán giận, không bám chặt vào được mất. Thương người mà không đòi hỏi, giúp người mà không mong đền đáp. Tâm xả giúp tình thương của ta rộng ra, không bị bó hẹp trong vài người mình yêu quý.',
      'Bốn tâm này có thể tập mỗi ngày. Sáng thức dậy, quý vị thầm nguyện, hôm nay con mang niềm vui đến cho một người. Gặp người đang khổ, nguyện cho họ bớt khổ. Nghe tin vui của bạn bè, thật lòng chúc mừng. Có ai làm mình phiền lòng, tập buông bỏ, không để bụng.',
      'Nguyện cho tâm từ bi hỷ xả luôn lớn lên trong lòng mỗi người, để gia đình hòa thuận, xóm làng yên vui, cuộc đời thêm nhiều yêu thương. Nam mô A Di Đà Phật.'
    ]
  },
  {
    id: 'nam-gioi',
    title: 'Năm Giới, Hàng Rào Giữ Gìn Hạnh Phúc',
    topic: 'Giữ Giới',
    summary: 'Năm điều nên giữ để thân tâm an ổn, gia đình yên vui và xã hội bình an.',
    paragraphs: [
      'Kính thưa quý phật tử, đức Phật dạy người tại gia giữ năm giới. Nhiều người nghe chữ giới thì thấy như bị cấm đoán, bị ràng buộc. Thật ra năm giới giống như hàng rào quanh khu vườn, giữ cho hoa trái không bị phá hoại. Giữ giới là để bảo vệ hạnh phúc của chính mình và người thân.',
      'Giới thứ nhất là không sát sinh. Tôn trọng sự sống của mọi loài. Từ đó ta nuôi lớn lòng thương, biết bảo vệ người yếu thế, không làm tổn hại ai. Một người có lòng thương như vậy thì gia đình cũng được nhờ, con cái học theo mà hiền lành.',
      'Giới thứ hai là không trộm cắp. Không lấy những gì người ta không cho, không gian dối để chiếm của người khác. Người giữ được giới này sống ngay thẳng, ngủ yên giấc, được mọi người tin cậy. Làm ăn mà giữ chữ tín thì lâu bền hơn bất cứ mánh khóe nào.',
      'Giới thứ ba là không tà dâm, nghĩa là chung thủy, tôn trọng hạnh phúc gia đình mình và gia đình người khác. Biết bao gia đình tan vỡ, con cái khổ sở chỉ vì thiếu giới này. Vợ chồng chung thủy thì gia đình mới thật sự là chỗ dựa bình yên.',
      'Giới thứ tư là không nói dối, và rộng hơn là không nói lời độc ác, không nói lời chia rẽ, không nói lời thêu dệt. Lời nói thật thà, hiền hòa khiến người nghe tin tưởng. Lời nói dối dù nhỏ cũng làm mất lòng tin, mà lòng tin mất đi thì rất khó lấy lại.',
      'Giới thứ năm là không uống rượu say và không dùng các chất gây nghiện. Khi say, con người dễ nói điều không nên nói, làm điều không nên làm, rồi phạm luôn cả bốn giới kia. Giữ đầu óc tỉnh táo là giữ cho mình khỏi bao nhiêu điều đáng tiếc.',
      'Không ai giữ giới hoàn hảo ngay từ đầu. Quý vị có thể bắt đầu từ một giới mình thấy dễ nhất, giữ cho thật tốt, rồi tập dần. Mỗi giới giữ được là một phần bình an thêm vào cuộc sống. Nguyện cho quý vị giữ giới thanh tịnh, thân tâm an lạc. Nam mô A Di Đà Phật.'
    ]
  },
  {
    id: 'ai-ngu',
    title: 'Lời Nói Ái Ngữ, Gieo Hoa Trong Lòng Người',
    topic: 'Chánh Ngữ',
    summary: 'Lời nói dịu dàng, chân thật có thể chữa lành, lời nói nặng nề có thể làm tổn thương rất lâu.',
    paragraphs: [
      'Kính thưa quý phật tử, mỗi ngày chúng ta nói ra rất nhiều lời. Có lời làm người khác vui, có lời làm người khác buồn rất lâu. Ông bà ta dạy, lời nói chẳng mất tiền mua, lựa lời mà nói cho vừa lòng nhau. Đạo Phật gọi lời nói dịu dàng, thương yêu là ái ngữ.',
      'Ái ngữ là một trong bốn cách đức Phật dạy để gần gũi, giúp đỡ mọi người, cùng với bố thí, làm việc lợi ích và cùng chung sức với người khác. Có khi ta không có tiền để giúp ai, nhưng một lời nói ấm áp lại giúp được rất nhiều.',
      'Ái ngữ không có nghĩa là nói ngọt để lấy lòng, cũng không phải nói dối cho người ta vui. Ái ngữ là nói điều chân thật bằng giọng nhẹ nhàng, đúng lúc, với mong muốn giúp người kia tốt hơn. Cùng một lời góp ý, nói bằng giọng gay gắt thì người ta chống lại, nói bằng tình thương thì người ta lắng nghe.',
      'Có câu ví rằng lời nói như cây đinh đóng vào tấm gỗ. Xin lỗi rồi thì có thể rút đinh ra, nhưng vết lỗ vẫn còn đó. Vì vậy trước khi nói, nhất là lúc đang giận, ta nên dừng lại tự hỏi, lời này có thật không, có cần thiết không, có làm ai tổn thương không.',
      'Trong gia đình, ái ngữ càng quan trọng. Người thân gần ta nhất nên ta hay nói với họ bằng giọng thiếu kiên nhẫn nhất. Một câu cảm ơn với người bạn đời, một lời khen với con cái, một lời hỏi han cha mẹ, những điều đó làm gia đình ấm áp hơn mọi món quà đắt tiền.',
      'Ái ngữ còn bao gồm cả việc biết im lặng đúng lúc. Có những khi không nói gì mà chỉ ngồi bên cạnh, lắng nghe trọn vẹn, lại là điều người kia cần nhất. Lắng nghe với lòng thương cũng là một cách nói lời yêu thương.',
      'Mời quý vị hôm nay nói ít nhất một lời ái ngữ với một người thân. Một lời cảm ơn, một lời khen, một lời xin lỗi còn nợ lâu nay. Nguyện cho lời nói của quý vị luôn như những bông hoa, mang hương thơm đến cho đời. Nam mô A Di Đà Phật.'
    ]
  },
  {
    id: 'biet-du',
    title: 'Biết Đủ Là Đủ',
    topic: 'Thiểu Dục Tri Túc',
    summary: 'Ham muốn không có đáy. Biết đủ thì nghèo vẫn vui, không biết đủ thì giàu vẫn khổ.',
    paragraphs: [
      'Kính thưa quý phật tử, đức Phật có dạy về thiểu dục tri túc, nghĩa là ít ham muốn và biết đủ. Người xưa nói, biết đủ thì lúc nào cũng đủ, biết dừng thì lúc nào cũng an. Câu này nghe đơn giản nhưng ai làm được thì sống rất thong dong.',
      'Ham muốn của con người giống như cái thùng không có đáy. Có xe đạp thì muốn xe máy, có xe máy thì muốn ô tô, có ô tô rồi lại muốn chiếc đắt hơn. Có nhà nhỏ muốn nhà lớn, có nhà lớn muốn thêm nhà nữa. Cứ chạy theo mãi như vậy, ta mệt mỏi mà không bao giờ thấy thỏa mãn.',
      'Biết đủ không có nghĩa là lười biếng, không cố gắng. Ta vẫn chăm chỉ làm ăn, vẫn lo cho gia đình đầy đủ. Nhưng làm với tâm bình thản, có được thì vui, chưa được thì tiếp tục cố gắng, không vì muốn hơn người mà làm điều trái lương tâm, không vì so sánh mà buồn khổ.',
      'Nhiều khi cái làm ta khổ không phải là thiếu thốn, mà là so sánh. Ta đang sống ổn, nhưng nhìn sang nhà hàng xóm có thứ mình không có, tự nhiên thấy thiếu. Nếu ta nhìn lại những gì mình đang có, sức khỏe, gia đình, mái nhà, bữa cơm, ta sẽ thấy mình đã có rất nhiều.',
      'Người biết đủ thường giàu có theo một cách khác. Họ giàu thời gian để ở bên người thân, giàu sức khỏe vì không chạy theo áp lực, giàu niềm vui vì dễ hài lòng. Có những người nhà cửa đơn sơ mà tiếng cười lúc nào cũng rộn ràng.',
      'Quý vị thử tập thế này. Trước khi mua một món đồ, hãy hỏi mình, mình cần nó thật hay chỉ là muốn. Trước khi buồn vì thiếu một điều gì, hãy kể ra năm điều mình đang có. Dần dần lòng ta sẽ thôi chạy theo, và bắt đầu thấy an.',
      'Nguyện cho quý vị luôn biết đủ, biết trân quý những gì mình đang có, sống thong dong, an vui giữa cuộc đời nhiều bon chen. Nam mô A Di Đà Phật.'
    ]
  },
  {
    id: 'gieo-duyen-lanh',
    title: 'Gieo Duyên Lành Mỗi Ngày',
    topic: 'Nhân Quả',
    summary: 'Việc thiện nhỏ đều đặn mỗi ngày là cách tích phước bền vững nhất.',
    paragraphs: [
      'Kính thưa quý phật tử, có người nghĩ làm phước phải là việc lớn, phải cúng dường thật nhiều, phải xây chùa, đúc tượng. Những việc đó rất quý, nhưng đức Phật cũng dạy rằng đừng xem thường việc thiện nhỏ. Giọt nước nhỏ nhỏ mãi cũng làm đầy cái chum.',
      'Mỗi ngày đều có rất nhiều cơ hội gieo duyên lành. Nhặt một cục đá giữa đường để người sau không vấp ngã. Nhường đường cho người đi trước. Giúp một cụ già qua đường. Gọi điện hỏi thăm người bạn lâu ngày không gặp. Những việc nhỏ như vậy không tốn bao nhiêu, nhưng gieo vào đời những hạt giống tốt.',
      'Gieo duyên lành cũng là gieo những ý nghĩ lành. Khi thấy người khác gặp chuyện, thay vì chê bai, ta thầm chúc họ vượt qua. Khi nghe tin người khác thành công, ta vui cùng họ. Tâm nghĩ điều lành thì miệng nói điều lành, tay làm điều lành.',
      'Luật nhân quả rất công bằng. Ta gieo hạt gì thì gặt quả nấy. Có khi quả đến ngay, có khi phải lâu sau mới đến, nhưng không bao giờ mất. Người hay giúp người thì lúc mình khó khăn, tự nhiên có người giúp lại. Người hay mỉm cười thì đi đâu cũng gặp nụ cười.',
      'Điều quan trọng là làm đều đặn và làm với tâm vui. Mỗi tối, quý vị có thể tự hỏi, hôm nay mình đã làm được điều gì tốt cho ai chưa. Nếu có, hãy hoan hỷ với việc đó. Nếu chưa, ngày mai mình làm. Cứ thế, ngày này qua ngày khác, phước lành sẽ tích lại như dòng suối nhỏ chảy thành sông.',
      'Gieo duyên lành còn là món quà cho con cháu. Con cái nhìn cha mẹ sống tử tế thì lớn lên cũng tử tế. Không có gia tài nào quý hơn một nếp nhà biết thương người, biết làm điều thiện.',
      'Nguyện cho mỗi ngày của quý vị đều có ít nhất một việc thiện nhỏ, một lời nói hay, một ý nghĩ lành. Từ những hạt giống ấy, cuộc sống sẽ nở ra thật nhiều hoa thơm trái ngọt. Nam mô A Di Đà Phật.'
    ]
  }
];
