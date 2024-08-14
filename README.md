Bütün action'ları tetiklemeye çalışıyorum fakat işlerimi kolaylaştırmak için remove işlemlerine bu koşulu biraz esnetebilirim.

Çünkü, örnek olarak sayfa ".card" class'ına sahip elemanların hem replace hem de remove edildiği bir configürasyon düşünelim. Eğer bu class elemanlarına ait alter işlemleri varsa ve remove işlemine öncelik verirsem bu işlemleri yapamam. 
Bunu gözeterek remove işlemlerine en düşük önceliği remove işlemine veriyorum


Normal şartlarda bu proje için şunu düşünebilirim: Elimde bir sayfa var. Birbirilerinden bağımsız olarak bu sayfada bazı kısımları replace ederek bazı kısımlara ise insert yaparak sayfa kendi istediğim hale getirmeye çalışabilirim.

Öte yandan insert ve replace işlemlerinin birbirleri ile bağlantılı çalıştığını düşünebilirim çünkü eklediğim bir html elemanı içindeki <p> etiketini replace etmem gerekebilir veya replace ettiğim bir elemanın içine HTML etiketi eklemem gerekebilir. Bunu diğer branchlerimde yapmaya çalışacağım

