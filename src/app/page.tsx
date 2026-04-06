'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Apple, Laptop, Trash2, Camera, Package, ShieldCheck, 
  Info, Monitor, Cpu, HardDrive, Battery, Calendar,
  Star, ExternalLink, AlertTriangle
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ChecklistSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  items: ChecklistItem[];
}

export default function MacbookSellChecklist() {
  const [sections, setSections] = useState<ChecklistSection[]>([
    {
      title: '기기 청소 & 관리',
      description: '첫인상이 가격을 결정합니다. 깨끗한 외관은 신뢰의 시작입니다.',
      icon: <Laptop className="w-5 h-5" />,
      color: "bg-blue-500",
      items: [
        { id: 'clean-body', label: '본체 외관 청소 (먼지, 지문 제거)', checked: false },
        { id: 'remove-stickers', label: '스티커 및 잔여물 제거 (끈적임 주의)', checked: false },
        { id: 'clean-display', label: '디스플레이 청소 (전용 클리너 권장)', checked: false },
        { id: 'clean-ports', label: '포트(USB-C, MagSafe 등) 먼지 제거', checked: false },
      ],
    },
    {
      title: '데이터 백업 & 초기화',
      description: '개인정보 유출을 방지하기 위해 반드시 수행해야 하는 필수 단계입니다.',
      icon: <Trash2 className="w-5 h-5" />,
      color: "bg-red-500",
      items: [
        { id: 'backup-data', label: '중요한 데이터 백업 (iCloud, 외장 하드 등)', checked: false },
        { id: 'logout-icloud', label: 'Apple ID 및 iCloud 로그아웃 (Find My Mac 포함)', checked: false },
        { id: 'logout-imessage', label: 'iMessage 및 FaceTime 로그아웃', checked: false },
        { id: 'unpair-bluetooth', label: 'Bluetooth 기기 페어링 해제', checked: false },
        { id: 'factory-reset', label: '모든 콘텐츠 및 설정 지우기 (완전 초기화)', checked: false },
      ],
    },
    {
      title: '판매용 사진 촬영',
      description: '고해상도 사진은 빠른 판매와 직결됩니다. 다양한 각도에서 촬영하세요.',
      icon: <Camera className="w-5 h-5" />,
      color: "bg-green-500",
      items: [
        { id: 'photo-angles', label: '전면/후면/측면 고해상도 전체샷', checked: false },
        { id: 'photo-scratches', label: '주요 흠집 및 찍힘 근접 사진 (솔직한 정보 공개)', checked: false },
        { id: 'photo-screen-on', label: '전원 켠 상태에서의 화면 사진 (불량화소 확인)', checked: false },
        { id: 'photo-specs', label: '이 Mac에 관하여 메뉴 스크린샷', checked: false },
      ],
    },
    {
      title: '구성품 & 패키징',
      description: '풀박스 구성은 중고 가격 방어에 매우 유리합니다.',
      icon: <Package className="w-5 h-5" />,
      color: "bg-orange-500",
      items: [
        { id: 'check-charger', label: '정품 충전기 및 충전 케이블', checked: false },
        { id: 'prepare-box', label: '정품 박스 및 내부 구성품 (설명서, 스티커 등)', checked: false },
        { id: 'check-warranty', label: '구매 영수증 또는 AppleCare+ 보증 증명서', checked: false },
      ],
    },
  ]);

  // Derived state: calculate progress directly during render
  const totalItems = sections.reduce((acc, section) => acc + section.items.length, 0);
  const checkedItems = sections.reduce(
    (acc, section) => acc + section.items.filter((item) => item.checked).length,
    0
  );
  const progress = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  const toggleItem = (sectionIndex: number, itemId: string) => {
    const newSections = [...sections];
    const itemIndex = newSections[sectionIndex].items.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      newSections[sectionIndex].items[itemIndex].checked = !newSections[sectionIndex].items[itemIndex].checked;
      setSections(newSections);
    }
  };

  const resetAll = () => {
    const newSections = sections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({ ...item, checked: false })),
    }));
    setSections(newSections);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header section with decorative elements */}
        <div className="relative text-center space-y-4">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-zinc-900 dark:bg-zinc-100 p-3 rounded-2xl text-white dark:text-black">
                <Apple className="w-10 h-10" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            맥북 판매전 체크 가이드
          </h1>
          <p className="max-w-xl mx-auto text-lg text-slate-500 dark:text-zinc-400">
            애플 맥북을 가장 비싸고 안전하게 파는 법. 단계별로 체크하고 판매 글을 완성하세요.
          </p>
        </div>

        {/* Progress Tracker and Quick Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 border-none shadow-xl bg-white dark:bg-zinc-900 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 w-full"></div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">판매 준비 완료도</CardTitle>
                  <CardDescription>현재 모든 필수 작업을 진행 중입니다.</CardDescription>
                </div>
                <Badge variant={progress === 100 ? "default" : "secondary"} className="text-lg py-1 px-4 font-bold">
                  {progress}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Progress value={progress} className="h-4" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="text-center space-y-1">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-widest text-[10px]">청소</p>
                  <p className="font-semibold">{sections[0].items.filter(i => i.checked).length}/{sections[0].items.length}</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-widest text-[10px]">보안</p>
                  <p className="font-semibold">{sections[1].items.filter(i => i.checked).length}/{sections[1].items.length}</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-widest text-[10px]">사진</p>
                  <p className="font-semibold">{sections[2].items.filter(i => i.checked).length}/{sections[2].items.length}</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-widest text-[10px]">구성품</p>
                  <p className="font-semibold">{sections[3].items.filter(i => i.checked).length}/{sections[3].items.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 dark:bg-zinc-800 text-white border-none shadow-xl flex flex-col justify-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                판매 팁
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4 text-zinc-300">
              <div className="flex gap-3">
                <div className="mt-1 bg-zinc-800 p-1 rounded"><Info className="w-3 h-3" /></div>
                <p>배터리 사이클과 최대 용량을 반드시 표기하세요.</p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 bg-zinc-800 p-1 rounded"><Info className="w-3 h-3" /></div>
                <p>애플케어 플러스가 남아있다면 가격을 10% 더 올릴 수 있습니다.</p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 bg-zinc-800 p-1 rounded"><Info className="w-3 h-3" /></div>
                <p>중고나라, 당근마켓, 번개장터 동시 게시가 유리합니다.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section: Device Specs Table */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="bg-indigo-600 w-1 h-6 rounded-full"></div>
            <h2 className="text-2xl font-bold">기기 사양 요약표 (판매 글 작성용)</h2>
          </div>
          <Card className="border-none shadow-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-zinc-900">
                <TableRow>
                  <TableHead className="w-[150px]">항목</TableHead>
                  <TableHead>상세 사양</TableHead>
                  <TableHead className="text-right">비고</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-slate-400" /> 모델명
                  </TableCell>
                  <TableCell>예: MacBook Pro 14 (M3 Pro)</TableCell>
                  <TableCell className="text-right text-xs text-slate-400 italic">2023년형</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-slate-400" /> 프로세서/RAM
                  </TableCell>
                  <TableCell>예: Apple M3 Pro / 18GB 통합 메모리</TableCell>
                  <TableCell className="text-right text-xs text-slate-400 italic">-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-slate-400" /> 저장 용량
                  </TableCell>
                  <TableCell>예: 512GB SSD</TableCell>
                  <TableCell className="text-right text-xs text-slate-400 italic">-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Battery className="w-4 h-4 text-slate-400" /> 배터리 성능
                  </TableCell>
                  <TableCell>예: 사이클 45회 / 성능 최대치 98%</TableCell>
                  <TableCell className="text-right text-xs text-slate-400 italic">매우 좋음</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> 보증 기간
                  </TableCell>
                  <TableCell>예: 2025년 12월까지 (애플케어+)</TableCell>
                  <TableCell className="text-right text-xs text-slate-400 italic">유효함</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Checklist sections with Icons and Visual flair */}
        <div className="space-y-8">
          <div className="flex items-center gap-2 px-2 pt-4">
            <div className="bg-indigo-600 w-1 h-6 rounded-full"></div>
            <h2 className="text-2xl font-bold">단계별 체크리스트</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, sIdx) => (
              <Card key={section.title} className="flex flex-col border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
                <CardHeader className="pb-4 relative">
                  <div className={`absolute top-0 left-0 w-1 h-full ${section.color}`}></div>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg text-white ${section.color} shadow-sm group-hover:scale-110 transition-transform`}>
                      {section.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      <CardDescription className="text-xs mt-1 leading-relaxed">
                        {section.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between p-0">
                  <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-4 hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer"
                        onClick={() => toggleItem(sIdx, item.id)}
                      >
                        <Checkbox
                          id={item.id}
                          checked={item.checked}
                          onCheckedChange={() => toggleItem(sIdx, item.id)}
                          className="w-5 h-5 data-[state=checked]:bg-indigo-600"
                        />
                        <label
                          htmlFor={item.id}
                          className={`text-sm font-medium leading-tight cursor-pointer transition-all ${
                            item.checked ? 'text-slate-400 line-through italic' : 'text-slate-700 dark:text-zinc-300'
                          }`}
                        >
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer actions with Warning */}
        <Card className="border-dashed border-2 border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-900/10">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-bold text-red-800 dark:text-red-400">가장 중요한 단계!</h3>
                <p className="text-sm text-red-600/80 dark:text-red-400/80">
                  데이터 초기화 전, 반드시 Apple ID 로그아웃을 먼저 진행하세요. <br className="hidden md:block" />
                  로그아웃 없이 초기화하면 다음 사용자가 기기를 활성화할 수 없는 '활성화 잠금' 상태가 될 수 있습니다.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <Button variant="outline" onClick={resetAll} className="w-full text-xs">
                진행 기록 초기화
              </Button>
              <Button className="w-full bg-zinc-900 dark:bg-zinc-100 hover:bg-black font-bold gap-2">
                판매글 양식 복사 <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <footer className="text-center pt-8 pb-12">
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>이 체크리스트는 Apple 공식 가이드를 기반으로 작성되었습니다.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
