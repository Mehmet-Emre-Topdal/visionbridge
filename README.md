# Vision Bridge Interview Case

Bu uygulama, YAML dosyalarında tanımlanan bir dizi DOM manipülasyon işlemini (alter, insert, replace, remove) dinamik olarak gerçekleştirmek üzere tasarlanmıştır. İşlemler arasındaki bağımlılıkları yönetir ve doğru sıralamayla çalıştırılmalarını sağlar.

## İçindekiler

1. [Uygulamanın Kurulumu ve Çalıştırılması](#uygulamanın-kurulumu-ve-çalıştırılması)
2. [Kod Yapısı Genel Bakış](#kod-yapısı-genel-bakış)
3. [Bağımlılık Yönetimi ve Tree Mantığı](#bağımlılık-yönetimi-ve-tree-mantığı)
4. [Varsayımlar ve Sınırlamalar](#varsayımlar-ve-sınırlamalar)
5. [YAML Dosyalarını Parse Etme](#yaml-dosyalarını-parse-etme)
6. [Sayfa, URL ve Host Bazlı Konfigürasyon Mantığı](#sayfa-url-ve-host-bazlı-konfigürasyon-mantığı)

## Uygulamanın Kurulumu ve Çalıştırılması

### Gereksinimler

Uygulamayı çalıştırmadan önce aşağıdaki gereksinimlerin yüklü olduğundan emin olun:

- Node.js
- npm

### Kurulum

1. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

2. YAML yapılandırma dosyanızı `config` dizinine yerleştirin. Varsayılan olarak `datasourceConfig.yaml` dosyası kullanılır. Bu dosyayı istediğiniz gibi değiştirebilir veya yeni dosyalar ekleyebilirsiniz.

3. Uygulamayı çalıştırın:

   ```bash
   npm start
   ```

   Bu komut, YAML dosyasındaki yapılandırmalara göre işlemleri çalıştıracaktır.

## Kod Yapısı Genel Bakış

Proje şu şekilde organize edilmiştir:

```bash
/src
  /actionRunners
    /Actions
      alterAction.js      
      insertAction.js     
      removeAction.js     
      replaceAction.js    
    applyAction.js        
    processActionsFromTree.js 
    traverseAndApply.js    

  /config
    datasourceConfig.yaml  

  /data
    A.yaml                 

  /fileReader
    readYAMLFile.js        
    readDatasourceConfig.js

  /models
    Action.js              
    ActionNode.js          

  /priority
    createDependencyTree.js 
    createQueues.js         
    isDependent.js          

applyConfigurations.js
index.js                    
```

### Klasörlerin ve Dosyaların Açıklamaları

- **/actionRunners/Actions**: Bu klasörde, DOM manipülasyonlarını gerçekleştiren ana action fonksiyonları yer alır. Her bir action (`alter`, `insert`, `replace`, `remove`) için ayrı dosyalar vardır. Bu fonksiyonlar, belirtilen işlemi DOM üzerinde gerçekleştirir.

- **/config**: Uygulamanın çalışması için gerekli olabilecek genel yapılandırma dosyaları bu klasörde bulunur. `datasourceConfig.yaml` dosyası, sayfa, URL ve host bazlı yapılandırma dosyalarının tanımlandığı yerdir.

- **/data**: Bu klasörde, uygulamanın çalışması için gereken veri dosyaları, özellikle YAML yapılandırma dosyaları bulunur. `A.yaml` gibi dosyalar, uygulamanın işlemlerini tanımlar.

- **/fileReader**: Bu klasörde, YAML dosyalarını okuyan ve işlemleri JSON formatına çeviren dosya bulunur. `readYAMLFile.js`, YAML dosyalarını okur ve analiz edilmek üzere veri olarak geri döndürür. `readDatasourceConfig.js` ise `datasourceConfig.yaml` dosyasını okur.

- **/models**: Bu klasörde, uygulama boyunca kullanılan veri modelleri yer alır. `Action.js` her işlemi bir nesne olarak temsil ederken, `ActionNode.js` bu işlemleri bir ağaç yapısında organize eder.

- **/priority**: Bu klasörde, işlemler arasındaki bağımlılıkları yönetmek ve işlem sıralarını belirlemek için kullanılan dosyalar bulunur. `createDependencyTree.js` bağımlılıkları analiz eder ve `createQueues.js` işlemleri sıralar. `isDependent.js`, iki işlem arasında bağımlılık olup olmadığını kontrol eder.

- **index.js**: Bu dosya, uygulamanın ana giriş noktasıdır. `datasourceConfig.yaml` dosyasındaki tanımlara göre yapılandırma dosyalarını okur ve geçerli sayfa, URL veya host'a uygun olan yapılandırmaları uygular.

## Bağımlılık Yönetimi ve Tree Mantığı

Bu uygulama, action'lar arasındaki bağımlılıkları yönetmek için bir bağımlılık ağacı (dependency tree) kullanır. Her action, bağımlı olduğu diğer action'lara göre sıralanır ve bu sıralamaya göre uygulanır. Bağımlılık ağacı, işlemlerin doğru sırayla ve hatasız bir şekilde gerçekleştirilmesini sağlar.

### Bağımlılık Ağacı (Dependency Tree)

Bağımlılık ağacı, action'ların birbirine olan bağımlılıklarını hiyerarşik bir yapıda organize eder. Her bir `ActionNode`, bir işlemi temsil eder ve bu işlemin bağımlı olduğu diğer işlemler, o düğümün çocuk düğümleri olarak eklenir. Bu yapı, action'ların doğru sırayla uygulanmasını ve bağımlılıkların doğru şekilde çözülmesini sağlar.

#### Ağaç Yapısının Oluşturulması

- **createDependencyTree.js**: Bu dosya, action'lar arasındaki bağımlılıkları analiz eder ve bağımlılık ağacını oluşturur. `isDependent.js` dosyası, iki işlem arasında bağımlılık olup olmadığını kontrol eder ve `createQueues.js` ise bu bağımlılıkları göz önünde bulundurarak işlemleri sıralar.

#### Ağaç Üzerinde Gezinme ve İşlemleri Uygulama

- **traverseAndApply.js**: Bağımlılık ağacı üzerinde gezinir ve her bir düğümü (işlemi) sırasıyla uygular. Eğer bir işlem başarılı olursa, o düğümün çocuk düğümleri de aynı şekilde işlenir.

Bu yöntem sayesinde, DOM manipülasyonları sırasında oluşabilecek karmaşık bağımlılıkların doğru şekilde yönetilmesi sağlanır. Bu da işlemlerin hatasız bir şekilde uygulanmasını garanti eder.

## Varsayımlar ve Sınırlamalar

### Varsayımlar

- **İşlem Sırası**: Mevcut uygulama, işlemlerin `alter`, `insert`, `replace`, ve `remove` kategorilerine ayrıldığını varsayar. Her kategorideki işlemler, YAML dosyasındaki sıraya göre uygulanır.

- **Bağımlılıklar**: Bağımlılıklar, basit mantıksal kontrollerle tespit edilir (örneğin, bir `replace` işlemi, başka bir `insert` veya `alter` işlemiyle çakışıyorsa). Uygulama, bu mantığın çoğu yaygın kullanım durumunu kapsayacağını varsayar.

- **Remove İşlemleri**: `remove` işlemlerinin her zaman en son uygulanacağı varsayılır. Bu, diğer işlemlerin uygulanmasını engellememek için yapılmıştır.

### Sınırlamalar

- **Karmaşık Bağımlılıklar**: Mevcut uygulama, özellikle dolaylı veya çok adımlı bağımlılıkları içeren daha karmaşık bağımlılık zincirleriyle başa çıkmakta zorlanabilir.

- **Hata Yönetimi**: Hata yönetimi temel düzeydedir; bir işlem başarısız olursa (örneğin, bir seçici herhangi bir elemanla eşleşmezse), bu işlem atlanır.

## YAML Dosyalarını Parse Etme

Uygulamada YAML dosyalarını parse etmek için hazır bir kütüphane kullandım. Bunun temel nedeni, asıl amacımın action'lar arasındaki öncelik yapılarını ve bağımlılıkları yönetmek olmasıdır. Eğer YAML dosyalarını manuel olarak parse etmeye çalışsaydım, bu işlem büyük olasılıkla çok zamanımı alacaktı ve özellikle edge case'lerdeki hataları yönetmek yönetmek oldukça zor olacaktı.


## Sayfa, URL ve Host Bazlı Konfigürasyon Mantığı

Uygulama, çalıştığı sayfa, URL veya host'a göre dinamik olarak yapılandırmaları uygular. `datasourceConfig.yaml` dosyasındaki yapılandırmalardan yalnızca ilgili olanlar uygulanır. Böylece, her sayfa, URL veya host için özel yapılandırmalar tanımlanabilir.


Bu konfigürasyon mantığında, `datasourceConfig.yaml` dosyasında belirli sayfalar, URL'ler veya host'lar için yapılandırma dosyaları tanımlanır. Uygulama çalıştığında, mevcut sayfa, URL veya host'a uygun olan bu yapılandırmalar dinamik olarak uygulanır. Böylece, her bir ortam için özel ve ilgili işlemler yapılır.

Örneğin, bir kullanıcı `example.com/products` URL'sine girdiğinde, bu URL'ye uygun olan `A.yaml` yapılandırma dosyası otomatik olarak uygulanır. Benzer şekilde, `cart` sayfasına girildiğinde, `A.yaml` ve `B.yaml` dosyalarının her ikisi de uygulanacaktır.
